🌦️ React Weather App

A responsive, real-time weather app built with **React JS** and the **OpenWeatherMap API**.  
This project was originally built by following a tutorial by [GreatStack](https://www.youtube.com/watch?v=zs1Nq2s_uy4&t=152s), and I later extended it with several unique features and improvements.


Features From the Original Tutorial
This project started with these core features:
-  City-based weather search
-  Current temperature display (in Celsius)
-  Wind speed and  humidity info
-  Weather icons that change based on condition
- Basic CSS layout and styling
- Uses OpenWeatherMap's `/weather` API


Features I Added or Improved
After building the base app, I made the following enhancements:

| Feature                         | Description |
|----------------------------------|-------------|
| ⏰ Live Updating Clock            | Local time of the searched city updates every second using `timezone` and `dt` from the API |
| 🌤️ Condition Label Below Icon    | Shows weather type like “Rain”, “Snow”, “Clear”, etc., under the icon — only for supported PNG icons |
| 🧊 Glassmorphism Card UI         | Weather container uses a translucent, blurred “frosted glass” effect for a modern UI |
| 🧼 Accessibility-Focused UI      | Removed floating text animation for better comfort and readability |
| 🖼️ Dynamic Backgrounds           | Automatically switches background image based on weather condition (e.g., rain, clear, snow) |
| 📁 `.env.example` File           | Added a sharable template for setting up environment variables (API key) without exposing them |




 Technologies Used:
- ⚛️ React JS (using Vite)
- 📦 JavaScript (ES6+)
- 🌤️ OpenWeatherMap API
- 🎨 CSS (custom styling, glassmorphism)

---

🚀 Getting Started

 1. Clone the Repository
'''bash
git clone [https://github.com/abhinav7860/weather-app.git]
cd weather-app

2. Install Dependencies
bash
Copy
Edit
npm install

3. Add Your API Key
Create a file named .env in the root directory:

ini
Copy
Edit
VITE_APP=your_openweathermap_api_key
📌 Don’t commit this file! It’s in .gitignore for your safety.
Use .env.example as a guide.

4. Run the App
bash
Copy
Edit
npm run dev

📷 Screenshots :

![image](https://github.com/user-attachments/assets/073f4b0e-947c-41d9-9b63-92b678b21dd4)
![image](https://github.com/user-attachments/assets/be951c48-cede-4caa-97d2-28874b9dcb62)

🙋 About Me
Author: Abhinav Sabu
📧 Email: abhinavsabu0@gmail.com
🔗 GitHub:(https://github.com/abhinav7860)

⭐ If you liked this project, feel free to star the repo or fork it to make your own version!


