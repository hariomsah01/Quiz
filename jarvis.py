import pyttsx3
import speech_recognition as sr
import datetime
import wikipedia
import webbrowser
import os
import requests
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
#print(voices[0].id)
engine.setProperty('voice', voices[0].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good Morning")
    elif hour>=12 and hour<18:
        speak("GOod afternoo")
    else:
        speak("Good Evening")
    speak("I am Jarvis sir. Please tell me how can I help you")

def takeCommand():
    #It takes microphone input from the user and returns string output.
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening.....")
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        print("Recognizing....")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
    except Exception as e:
        #print(e)
        print("Say that again please ....")
        return "None"
    return query

# if __name__ == "__main__":
    wishMe()
    while True: 
        query = takeCommand().lower()
    #Logic for executing tasks based on query
        if 'wikipedia' in query:
            speak('Searching Wikipedia...')
            query = query.replace('wikipedia', "")
            results = wikipedia.summary(query, sentences=2)
            speak("According to Wikipedia")
            print(results)
            speak(results)
        elif 'open youtube' in query:
            webbrowser.open("youtube.com")
        elif 'open google' in query:
            webbrowser.open("google.com")
        elif 'the time' in query:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"Sir, the time is {strTime}")
            

API_key = "2b2322dc9cdba6c9e743017b96e7859e"  # Replace with your actual OpenWeatherMap API key
lat = "40.735619"  # Replace with the latitude of the location you're interested in
lon = "-74.175834"  # Replace with the longitude of the location you're interested in
def check_api_key(API_key):
    api_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}"

    print(api_url)

    response = requests.get(api_url)

    if response.status_code == 200:
        return True  # API key is valid
    else:
        return False  # API key is invalid or unauthorized

# Check the API key
if check_api_key(API_key):
    print("API key is valid.")
else:
    print("API key is invalid or unauthorized.")


def get_hourly_forecast():
    api_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}"

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        # You can now work with the data as needed to extract weather information
        # Example: data['list'] contains hourly forecast data

        return data
    except requests.exceptions.RequestException as e:
        print("Error fetching weather forecast data:", e)
        return None

# You can call this function to get the hourly weather forecast data
hourly_forecast_data = get_hourly_forecast()
# print(hourly_forecast_data)
if hourly_forecast_data:
    # Process and use the weather forecast data
    # You will need to parse and extract the specific weather information you require
    print(hourly_forecast_data["main"]["temp"])
    # You can also speak the weather data using your `speak` function
