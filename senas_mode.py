import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf

# 1. Cargar el modelo con verificación Letras
try:
    model_letras = tf.keras.models.load_model("D:\\Proyectos_AI\\Sitio_AI_Sol\\AISol\\h5_models\\pru_abece_20.h5")
    print("✅ Modelo cargado correctamente: Letras")

except Exception as e:
    print("❌ Error al cargar el modelo: Letras", e)
    exit()

# 1_2. Cargar el modelo con verificación animales
try:
    model_animal = tf.keras.models.load_model("D:\\Proyectos_AI\\Sitio_AI_Sol\\AISol\\prue_animal_20.h5")
    print("✅ Modelo cargado correctamente: Animales")
    
except Exception as e:
    print("❌ Error al cargar el modelo: Animales", e)
    exit()

# Definir conjuntos de acciones
actions_letras = np.array(['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
actions_animal = np.array(['Aguila', 'Burro', 'Caballo','gato','perro'])

# Definir el conjunto de acciones
colors = [(245,117,16) for _ in range(max(len(actions_letras), len(actions_animal)))]
#colors = [(245,117,16) for _ in actions_animal]

def prob_viz (res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
    return output_frame

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False                  # Image is no longer writeable
    results = model.process(image)                 # Make prediction
    image.flags.writeable = True                   # Image is now writeable 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
    return image, results

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]) if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]) if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]) if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]) if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose.flatten(), face.flatten(), lh.flatten(), rh.flatten()])

# Configuración
threshold = 0.7  # Umbral de confianza
current_mode = "letras"  # Modo inicial ('letras' o 'animal')

# Variables de estado
sequence = []
sentence = []

# Función modificada para usar sentence como parámetro
def predict_and_update(sequence, model, actions, current_sentence):
    res = model.predict(np.expand_dims(sequence, axis=0))[0]
    predicted_action = actions[np.argmax(res)]
    confidence = np.max(res)
    
    if confidence > threshold:
        if len(current_sentence) > 0:
            if predicted_action != current_sentence[-1]:
                current_sentence.append(predicted_action)
        else:
            current_sentence.append(predicted_action)
        
        current_sentence = current_sentence[-5:]
    
    return res, predicted_action, confidence, current_sentence


mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

cap = cv2.VideoCapture(0)

with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        image, results = mediapipe_detection(frame, holistic)
        
        # Detección de manos
        hand_detected = results.left_hand_landmarks or results.right_hand_landmarks
        
        if hand_detected:
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-20:]
            
            if len(sequence) == 20:
                if current_mode == "letras":
                    res, action, conf, sentence = predict_and_update(sequence, model_letras, actions_letras, sentence)
                else:
                    res, action, conf, sentence = predict_and_update(sequence, model_animal, actions_animal, sentence)
                
                print(f"Modo: {current_mode} | Predicción: {action} | Confianza: {conf:.2f}")
                
                # Visualización de probabilidades
                image = prob_viz(res, actions_letras if current_mode == "letras" else actions_animal, image, colors)
        
        # Cambiar modo con tecla 'm'
        key = cv2.waitKey(10)
        if key == ord('m'):
            current_mode = "animal" if current_mode == "letras" else "letras"
            sequence = []  # Reiniciar secuencia al cambiar modo
            print(f"Modo cambiado a: {current_mode}")
        
        # Visualización
        cv2.rectangle(image, (0,0), (640, 70), (245, 117, 16), -1)
        cv2.putText(image, ' '.join(sentence), (3,30), 
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        cv2.putText(image, f"Modo: {current_mode}", (3,60), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 1, cv2.LINE_AA)
        
        cv2.imshow('OpenCV Feed', image)
        
        if key & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()