#!/usr/bin/env python3
"""
UR East Kanagawa Apartment Availability Checker
Triggered by GitHub Actions cron. Runs once and exits.
Sends a push notification via ntfy.sh when rooms are available.
"""

import os
import sys
import requests
from datetime import datetime

# ─── CONFIG ───────────────────────────────────────────────────────────────────

# Set as a GitHub Actions Secret named NTFY_TOPIC
NTFY_TOPIC = "ur-east-kanagawa-supernova-42"

ROOM_TYPES = ["1LDK", "2K", "2DK"]

# Bounding box for East Kanagawa
NE_LAT = 35.58560762751869
NE_LNG = 139.7360707173103
SW_LAT = 35.502360969814525
SW_LNG = 139.56509598586499

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
    payload = build_payload()
    print(f"[{now()}] POST {API_URL}")
    print(f"[{now()}] Payload: {payload}")
    try:
        response = requests.post(API_URL, headers=HEADERS, data=payload, timeout=15)
        print(f"[{now()}] Response status: {response.status_code}")
        print(f"[{now()}] Response body (first 500 chars): {response.text[:500]}")
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"[{now()}] ERROR fetching API: {e}")
        sys.exit(1)


def send_notification(available):
    total_rooms = sum(item["roomCount"] for item in available)
    lines = [f"• ID {item['id']}: {item['roomCount']} room(s)" for item in available]
    message = f"{total_rooms} room(s) across {len(available)} building(s)!\n" + "\n".join(lines)
    title = f"UR East Kanagawa - {len(available)} building(s) available!"

    print(f"[{now()}] Sending notification to ntfy.sh/{NTFY_TOPIC}")
    print(f"[{now()}] Title: {title}")
    print(f"[{now()}] Message: {message}")
    try:
        r = requests.post(
            f"https://ntfy.sh/{NTFY_TOPIC}",
            data=message.encode("utf-8"),
            headers={"Title": title, "Priority": "high", "Tags": "house,bell"},
            timeout=10,
        )
        print(f"[{now()}] ntfy response status: {r.status_code} — {r.text}")
        r.raise_for_status()
        print(f"[{now()}] Notification sent: {title}")
    except Exception as e:
        print(f"[{now()}] ERROR sending notification: {e}")
        sys.exit(1)


def main():
    print(f"[{now()}] NTFY_TOPIC: {NTFY_TOPIC}")
    if not NTFY_TOPIC:
        print("ERROR: NTFY_TOPIC is not set")
        sys.exit(1)
    print(f"[{now()}] Checking UR API for East Kanagawa availability...")
    data = fetch_listings()
    print(f"[{now()}] Raw data type: {type(data).__name__}, keys: {list(data.keys()) if isinstance(data, dict) else 'N/A (list)'}")
    listings = data if isinstance(data, list) else data.get("list", [])
    print(f"[{now()}] Total listings returned: {len(listings)}")
    available = [item for item in listings if item.get("roomCount", 0) > 0]
    print(f"[{now()}] Listings with roomCount > 0: {len(available)}")

    if available:
        print(f"[{now()}] FOUND {len(available)} building(s) with rooms!")
        for item in available:
            print(f"  -> ID: {item['id']} | Rooms: {item['roomCount']}")
    else:
        print(f"[{now()}] No rooms available (checked {len(listings)} buildings.)")
    send_notification(available)

if __name__ == "__main__":
    main()