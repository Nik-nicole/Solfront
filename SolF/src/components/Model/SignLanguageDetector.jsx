import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const SignLanguageDetector = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:5000/auth/api';

  // Start/stop detection
  const toggleDetection = () => {   
    if (isDetecting) {
      stopDetection();
    } else {
      startDetection();
    }
  };

  const startDetection = () => {
    setIsDetecting(true);
    setSequence([]);
    setRecentPredictions([]);
    setError(null);
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  // Process a single frame
  const processFrame = async () => {
    if (!isDetecting || isProcessing || !webcamRef.current) return;

    setIsProcessing(true);
    
    try {
      const screenshot = webcamRef.current.getScreenshot();
      
      const response = await axios.post(`${API_URL}/process_frame`, {
        image: screenshot,
        sequence: sequence
      });
      
      // Update state with response data
      setSequence(response.data.sequence);
      
      if (response.data.prediction) {
        setPrediction(response.data.prediction);
        setConfidence(response.data.confidence);
        
        // Add to recent predictions if confidence is above threshold
        if (response.data.confidence > 0.8) {
          setRecentPredictions(prev => {
            // Only add if it's different from the last prediction
            if (prev.length === 0 || prev[prev.length - 1] !== response.data.prediction) {
              return [...prev, response.data.prediction].slice(-5);
            }
            return prev;
          });
        }
      }
    } catch (error) {
      console.error('Error processing frame:', error);
      setError('Error al procesar la imagen. Por favor, intente de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Process frames at regular intervals
  useEffect(() => {
    let intervalId;
    
    if (isDetecting) {
      intervalId = setInterval(processFrame, 100); // Process 10 frames per second
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isDetecting, isProcessing, sequence]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold">Reconocimiento de Lenguaje de Señas</h2>
          <p className="text-white/80">Realiza señas frente a la cámara para su interpretación en tiempo real</p>
        </div>
        
        <div className="p-6">
          {/* Webcam Container */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-6">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              mirrored={true}
              className="w-full h-full object-cover"
              onUserMedia={() => setIsLoading(false)}
              onUserMediaError={() => {
                setError('No se pudo acceder a la cámara. Por favor, verifique los permisos.');
                setIsLoading(false);
              }}
            />
            
            {isDetecting && prediction && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center">
                <h3 className="text-white text-3xl font-bold">{prediction}</h3>
                <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button 
              onClick={toggleDetection}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 flex-1 ${
                isDetecting 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isDetecting ? 'Detener Detección' : 'Iniciar Detección'}
            </button>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}
          
          {/* Recent predictions */}
          {isDetecting && recentPredictions.length > 0 && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Predicciones Recientes:</h3>
              <p className="text-xl font-bold text-gray-900">{recentPredictions.join(' ')}</p>
            </div>
          )}
          
          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Cómo usar:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-blue-700">
              <li>Haz clic en "Iniciar Detección" para comenzar.</li>
              <li>Asegúrate de que tu cuerpo y manos sean visibles en la cámara.</li>
              <li>Realiza las señas de forma clara y pausada.</li>
              <li>Mantén una buena iluminación para mejores resultados.</li>
              <li>Las predicciones aparecerán debajo del video en tiempo real.</li>
            </ol>
            <div className="mt-4 text-sm text-blue-600">
              <p>* El sistema reconoce las siguientes señas: Hola, Gracias, YoAmoTi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageDetector;