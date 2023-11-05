import pyttsx3
import speech_recognition as sr
import datetime
import wikipedia
import webbrowser
import os
import random
import requests
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
#print(voices[0].id)
engine.setProperty('voice', voices[1].id)
import json

# Sample JSON data


       

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
        json_data = response.json()
        
        # You can directly work with the JSON data in the 'json_data' variable.

        # Iterate through the keys and values and format them as strings
        formatted_strings = []
        for key, value in json_data.items():
            formatted_string = f"The {key} is {value}"
            formatted_strings.append(formatted_string)

        # Join the formatted strings into a single string
        result_string = "\n".join(formatted_strings)

        return result_string
    except requests.exceptions.RequestException as e:
        print("Error fetching weather forecast data:", e)
        return None

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

if __name__ == "__main__":
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
        elif "weather" in query:
             speak("running")
             hourly_forecast_data = get_hourly_forecast()
             speak(hourly_forecast_data)
        elif "sing" in query:
            lyrics = """aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                Baby Shark, doo-doo, doo-doo, doo-doo
                Baby Shark, doo-doo, doo-doo, doo-doo
                Baby Shark, doo-doo, doo-doo, doo-doo
                Baby Shark

                Mommy Shark, doo-doo, doo-doo, doo-doo
                Mommy Shark, doo-doo, doo-doo, doo-doo
                Mommy Shark, doo-doo, doo-doo, doo-doo
                Mommy Shark

                Daddy Shark, doo-doo, doo-doo, doo-doo
                Daddy Shark, doo-doo, doo-doo, doo-doo
                Daddy Shark, doo-doo, doo-doo, doo-doo
                Daddy Shark

                Grandma Shark, doo-doo, doo-doo, doo-doo
                Grandma Shark, doo-doo, doo-doo, doo-doo
                Grandma Shark, doo-doo, doo-doo, doo-doo
                Grandma Shark

                Grandpa Shark, doo-doo, doo-doo, doo-doo
                Grandpa Shark, doo-doo, doo-doo, doo-doo
                Grandpa Shark, doo-doo, doo-doo, doo-doo
                Grandpa Shark

                Let's go hunt, doo-doo, doo-doo, doo-doo
                Let's go hunt, doo-doo, doo-doo, doo-doo
                Let's go hunt, doo-doo, doo-doo, doo-doo
                Let's go hunt

                Run away, doo-doo, doo-doo, doo-doo
                Run away, doo-doo, doo-doo, doo-doo
                Run away, doo-doo, doo-doo, doo-doo
                Run away (ah!)

                Safe at last, doo-doo, doo-doo, doo-doo
                Safe at last, doo-doo, doo-doo, doo-doo
                Safe at last, doo-doo, doo-doo, doo-doo
                Safe at last (phew)

                It's the end, doo-doo, doo-doo, doo-doo
                It's the end, doo-doo, doo-doo, doo-doo
                It's the end, doo-doo, doo-doo, doo-doo
                It's the end
                """

            lyric_chunks = lyrics.splitlines()

# Call the speak function for each chunk
            for chunk in lyric_chunks:

# Assuming you have a list of voices (voices) that you want to select from
                selected_voice = random.choice([0,1])

# Set the voice property to the selected voice's ID
                engine.setProperty('voice', voices[selected_voice].id)

                speak(chunk)
            
        else:
            speak("GO hackathon")

     