from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from starlette import status

app = FastAPI()

# Mount static directory for serving CSS and JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Helper function
def calculator(amount: float, months: int, shift: float, total_days: int) -> int:
    return amount / (months * shift * total_days)

# Redirect to the home endpoint
@app.get("/")
def test(request: Request):
    return RedirectResponse(url="/templates/home", status_code=status.HTTP_302_FOUND)

# Endpoint to serve the HTML page
@app.get("/templates/home")
async def serve_html_page():
    return FileResponse("templates/home.html")

# Main calculation function
@app.get('/home/{amount}/{size}/{months}/{shift}/{days}')
async def calculation(amount: float, size: int, months: int, shift: int, days: int):
    try:
        global Size
        Size = size
        ton_per_day = calculator(amount, months, shift, days)
        return {"ton_per_day": ton_per_day}
    except HTTPException:
        return {"error": "Something went wrong"}
