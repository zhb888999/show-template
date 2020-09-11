import io
from PIL import Image
import numpy as np
from cv2 import cv2
import base64

def array2base64(array):
    array = cv2.cvtColor(array, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(array.astype('uint8')).convert('RGB')
    buf = io.BytesIO()
    image.save(buf, format='JPEG')
    binary_data = buf.getvalue()
    res = base64.b64encode(binary_data)
    res = str(res)[2:-1]
    return res

def base642array(b64):
    image = base64.b64decode(b64[23:])
    image = np.frombuffer(image, np.uint8)
    return cv2.imdecode(image, cv2.IMREAD_COLOR)

def file2array(file):
    image = Image.open(file)
    image = np.array(image)
    return cv2.cvtColor(image, cv2.COLOR_RGB2BGR)