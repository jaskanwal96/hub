#!/usr/bin/env python3
"""
UR Kawasaki Apartment Availability Checker
Triggered by GitHub Actions cron. Runs once and exits.
Sends a push notification via ntfy.sh when rooms are available.
"""

import os
import sys
import requests
from datetime import datetime

# ─── CONFIG ───────────────────────────────────────────────────────────────────

# Set as a GitHub Actions Secret named NTFY_TOPIC
NTFY_TOPIC = "ur-kawasaki-supernova-42"

ROOM_TYPES = ["1LDK", "2K", "2DK"]

# Bounding box for Kawasaki
NE_LAT = 35.57314206111617
NE_LNG = 139.72937870685467
SW_LAT = 35.48988245881424
SW_LNG = 139.55840397540936

# ──────────────────────────────────────────────────────────────────────────────

API_URL = "https://chintai.r6.ur-net.go.jp/chintai/api/bukken/search/map_marker/"

HEADERS = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.ur-net.go.jp",
    "Referer": "https://www.ur-net.go.jp/",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
}


def now():
    return datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")


def build_payload():
    room_params = "&".join(f"room={r}" for r in ROOM_TYPES)
    return (
        f"rent_low=&rent_high=&floorspace_low=&floorspace_high="
        f"&{room_params}"
        f"&ne_lat={NE_LAT}&ne_lng={NE_LNG}"
        f"&sw_lat={SW_LAT}&sw_lng={SW_LNG}"
        f"&small=false"
    )


def fetch_listings():
    try:
        response = requests.post(API_URL, headers=HEADERS, data=build_payload(), timeout=15)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"[{now()}] ERROR fetching API: {e}")
        sys.exit(1)


def send_notification(available):
    total_rooms = sum(item["roomCount"] for item in available)
    lines = [f"• ID {item['id']}: {item['roomCount']} room(s)" for item in available]
    message = f"{total_rooms} room(s) across {len(available)} building(s)!\n" + "\n".join(lines)
    title = f"UR Kawasaki — {len(available)} building(s) available!"

    try:
        r = requests.post(
            f"https://ntfy.sh/{NTFY_TOPIC}",
            data=message.encode("utf-8"),
            headers={"Title": title, "Priority": "high", "Tags": "house,bell"},
            timeout=10,
        )
        r.raise_for_status()
        print(f"[{now()}] Notification sent: {title}")
    except Exception as e:
        print(f"[{now()}] ERROR sending notification: {e}")
        sys.exit(1)


def main():
    if not NTFY_TOPIC:
        print("ERROR: NTFY_TOPIC env var is not set")
        sys.exit(1)
    print(f"[{now()}] Checking UR API for Kawasaki availability...")
    data = fetch_listings()
    listings = data if isinstance(data, list) else data.get("list", [])
    available = [item for item in listings if item.get("roomCount", 0) > 0]

    if available:
        print(f"[{now()}] FOUND {len(available)} building(s) with rooms!")
        for item in available:
            print(f"  -> ID: {item['id']} | Rooms: {item['roomCount']}")
        send_notification(available)
    else:
        print(f"[{now()}] No rooms available (checked {len(listings)} buildings.)")


if __name__ == "__main__":
    main()