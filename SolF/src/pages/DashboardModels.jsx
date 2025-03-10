import { useState } from 'react';
import SignLanguageDetector from '../components/Model/SignLanguageDetector';
import Header from "../components/Home/Header"

const ModeloLSCPage = () => {
  return (
    
    
    <div className="min-h-screen bg-gray-50">
        <div>
        <Header showNavLinks={true} showAuthButtons={false} />
        </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Modelo de Reconocimiento LSC
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Utiliza nuestra inteligencia artificial para interpretar el Lenguaje de Señas Colombiano en tiempo real.
          </p>
        </div>

        <div className="mb-16">
          <SignLanguageDetector />
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Información del Modelo</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles técnicos y funcionamiento</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Arquitectura</dt>
                <dd className="mt-1 text-sm text-gray-900">LSTM + Dense / CNN + Dense</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Precisión</dt>
                <dd className="mt-1 text-sm text-gray-900">~95% en conjunto de prueba</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Tecnologías</dt>
                <dd className="mt-1 text-sm text-gray-900">TensorFlow, MediaPipe, Flask, React</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Señas reconocidas</dt>
                <dd className="mt-1 text-sm text-gray-900">Hola, Gracias, YoAmoTi</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Funcionamiento</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  El modelo utiliza MediaPipe para detectar puntos clave del cuerpo, manos y cara. 
                  Estos puntos se procesan mediante una red neuronal entrenada para clasificar 
                  secuencias de movimientos en señas específicas del LSC. La cámara captura 
                  fotogramas que se analizan en tiempo real para proporcionar interpretaciones 
                  precisas.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeloLSCPage;