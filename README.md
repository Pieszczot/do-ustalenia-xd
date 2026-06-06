# do-ustalenia-xd
System rezerwacji wizyt dla kliniki weterynaryjnej

Uruchomienie APP
Python wersja 3.9+
pip
Docker Desktop albo lokalny PostgreSQL
Uruchomienie bazy danych (główny folder projektu):
docker compose up -d db
Uruchomienie backendu (główny folder projektu):
py -m venv VetKlinika\.venv
VetKlinika\.venv\Scripts\activate
pip install -r requirements.txt
python VetKlinika\manage.py migrate
python VetKlinika\manage.py check
python VetKlinika\manage.py runserver 127.0.0.1:8000
Panel administratora:
http://127.0.0.1:8000/admin/
Utworzenie konta administratora (po aktywowaniu venv i uruchomieniu bazy):
python VetKlinika\manage.py createsuperuser
Node wersja v20.19+ lub v22.12+
npm w wersji 10+
Uruchomienie frontendu (główny folder projektu):
npm install
npm run dev
Frontend:
http://localhost:5173
Backend musi działać równolegle z frontendem, ponieważ requesty /api/... są przekazywane do Django.
