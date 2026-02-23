# How to Test the CV Tailor MVP

> [!NOTE]
> The AI is now powered by **Google Gemini 1.5 Flash** using your Provided API Key.
> Tailoring, Translation, and Analysis are now 100% active and real.

Follow these steps to run the application locally and test the full flow.

## 1. Backend Setup
Open a terminal in the `backend` directory and run:
```powershell
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

## 2. Frontend Setup
Open another terminal in the `web-client` directory and run:
```powershell
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## 3. Testing the Flow
1.  Navigate to `http://localhost:3000/dashboard`.
2.  **Upload CV**: In this MVP version, you can select any PDF/DOCX. The backend will process it using the ParserService.
3.  **Paste JD**: Paste a sample Job Description.
4.  **Analyze**: Click "Analyze Skills Gap" to see the Match Report.
5.  **Tailor**: Choose a variant (e.g., Technical) to generate the tailored version.
6.  **Review**: Use the Diff Editor to see exactly what changed.
7.  **Export**: Click "Download DOCX" to get your tailored CV.

## 4. Troubleshooting (Windows/PowerShell)

If you see an error like `running scripts is disabled on this system`, run this command in your terminal to allow local scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Also, ensure you are inside the correct folders:
- For Backend: `cd C:\Users\Michele\Desktop\cv\backend`
- For Web: `cd C:\Users\Michele\Desktop\cv\web-client`
