from models.user import User
from app import bcrypt, Config, db
from Services.base_service import BaseService
import tensorflow as tf
import numpy as np
import cv2 
import mediapipe as mp
import base64
import io
from PIL import Image 
from flask import request, jsonify
    ################################################# AQUIIII
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(min_detection_confidence=0.10, min_tracking_confidence=0.10)

# Load trained model
#model = tf.keras.models.load_model(r"D:/Proyectos_AI/Sitio_AI_Sol/AISol/prueba5.h5")
#model = tf.keras.models.load_model(r"D:/Proyectos_AI/Sitio_AI_Sol/AISol/prue_animal_30.h5")
#model = tf.keras.models.load_model(r"D:/Proyectos_AI/Sitio_AI_Sol/AISol/h5_models/pru_fruta_25_50.h5")
#model = tf.keras.models.load_model(r"D:/Proyectos_AI/Sitio_AI_Sol/AISol/h5_models/pru_abece_20.h5")
model = tf.keras.models.load_model("D:\\Proyectos_AI\\Sitio_AI_Sol\\AISol\\h5_models\\pru_abece_20_homg.h5") 

# Define actions
#actions = np.array(['Hola', 'Gracias', 'YoAmoTi'])
#actions = np.array(['Aguila', 'Burro', 'Caballo','gato','perro'])
#actions = np.array(['Banano', 'Coco', 'Uva', 'Manzana', 'Piña'])
actions = np.array(['A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'])

    
# Function to process MediaPipe results
def mediapipe_detection(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = holistic.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

# Function to extract keypoints
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]) if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]) if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]) if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]) if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose.flatten(), face.flatten(), lh.flatten(), rh.flatten()])

class UserService(BaseService):
    def __init__(self):
        super().__init__(User)
    
    def create_user(self, user, from_google=False):
        if not user.username or not user.email:
            raise ValueError("Username and email are required")

        if self.model.query.filter_by(email=user.email).first():
            raise ValueError("Email is already registered")

        if from_google:
            user.password_hash = "" if not user.password_hash else user.password_hash
        else:
            if not user.password_hash or len(user.password_hash) < Config.PASSWORD_MIN_LENGTH:
                raise ValueError(f"Password must be at least {Config.PASSWORD_MIN_LENGTH} characters long")
            user.password_hash = bcrypt.generate_password_hash(user.password_hash).decode("utf-8", "ignore")
        
        return self.save(user)

    def authenticate_user(self, email, password):
        if not email or not password:
            raise ValueError("Email and password are required")
        user = self.model.query.filter_by(email=email).first()
        return user if user and bcrypt.check_password_hash(user.password_hash, password) else None

    def get_user_by_email(self, email):
        if not email:
            raise ValueError("Email is required")
        return self.model.query.filter_by(email=email).first()

    def get_user_by_id(self, user_id):
        if not user_id:
            raise ValueError("id is required")
        return self.model.query.get(user_id)

# Function to process an image and make a prediction
def process_image():
    #hand_detected = False
    data = request.json
    base64_image = data.get('image', '')
    sequence_data = data.get('sequence', [])
    
    # Decode the base64 image
    img_data = base64.b64decode(base64_image.split(',')[1] if ',' in base64_image else base64_image)
    img = Image.open(io.BytesIO(img_data))
    img_array = np.array(img)
    
    # Process with MediaPipe
    image, results = mediapipe_detection(img_array)
    
    #if results.left_hand_landmarks or results.right_hand_landmarks:
     #   hand_detected = True
    #else:
     #   hand_detected = False
     #   sequence = []  # Reiniciar la secuencia si no hay manos

    #if hand_detected:    
        # Extract keypoints
    keypoints = extract_keypoints(results)
        # Update sequence
    sequence = sequence_data.copy()
    sequence.append(keypoints.tolist())
    sequence = sequence[-20:]
    
        # Make prediction if sequence is complete
    prediction, confidence = None, 0.0

    if len(sequence) == 20:
        res = model.predict(np.expand_dims(np.array(sequence), axis=0))[0]
        prediction = actions[np.argmax(res)]
        confidence = float(res[np.argmax(res)])
    
    return jsonify({
        'prediction': prediction,
        'confidence': confidence,
        'sequence': sequence
    })
