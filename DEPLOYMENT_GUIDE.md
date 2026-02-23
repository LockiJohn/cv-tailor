# CV Tailor Deployment Guide (100% Free)

Follow these steps to put your application online.

## 1. Create a GitHub Repository
1.  Go to [github.com](https://github.com/) and create a new **Private** repository named `cv-tailor`.
2.  In your terminal, run these commands (replace `YOUR_USERNAME`):
    ```powershell
    git remote add origin https://github.com/YOUR_USERNAME/cv-tailor.git
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy the Backend (on Render)
1.  Go to [Render.com](https://render.com/) and Log In with GitHub.
2.  Click **New +** -> **Web Service**.
3.  Connect your `cv-tailor` repository.
4.  Configure the service:
    - **Name**: `cv-tailor-backend`
    - **Root Directory**: `backend`
    - **Runtime**: `Node`
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `npm start`
5.  Go to **Environment** tab and add:
    - `GOOGLE_GEMINI_API_KEY`: `AIzaSyBUEj03-7JqcMbzuOr4bTi02dK4Vb799os`
    - `NODE_ENV`: `production`
6.  Click **Create Web Service**. 
    - *Copy the URL produced (e.g., `https://cv-tailor-backend.onrender.com`).*

## 3. Deploy the Frontend (on Vercel)
1.  Go to [Vercel.com](https://vercel.com/) and Log In with GitHub.
2.  Click **Add New** -> **Project**.
3.  Import your `cv-tailor` repository.
4.  Configure the Project:
    - **Framework Preset**: `Next.js`
    - **Root Directory**: `web-client`
5.  Open **Environment Variables** and add:
    - `NEXT_PUBLIC_API_URL`: `https://YOUR-RENDER-URL.onrender.com/api`
6.  Click **Deploy**.

## 4. Verification
Once both are finished:
1.  Open your Vercel URL.
2.  The app will be live and talking to your backend on Render.

---
**Note**: Render's free tier "sleeps" after 15 minutes of inactivity. The first request might take ~30 seconds to wake up the server.
