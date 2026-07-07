# ROADMAP.md

# MooMoo-inspired Browser Game

*A multiplayer browser game inspired by MooMoo.io, built from scratch using modern web technologies.*

---

# Project Goals

## Primary Goal

Build a clean, modular, well-documented multiplayer browser game that supports:

* Multiplayer (10–20 players)
* AI bots
* Building
* Resource gathering
* Combat
* Expandability
* Easy debugging
* Open-source development

---

# Technology Stack

## Frontend

* TypeScript
* Vite
* PixiJS

Responsibilities:

* Rendering
* Camera
* UI
* Input
* Animation
* Sound
* Client-side prediction (future)

---

## Backend

* Node.js
* TypeScript
* WebSockets

Responsibilities:

* Game simulation
* Combat
* Physics
* Validation
* Multiplayer
* Bots
* World generation

---

## Shared

Contains data used by both client and server.

Examples:

* Weapons
* Items
* Constants
* Tile definitions
* Packet definitions
* Shared types

---

# Folder Structure

client/

server/

shared/

docs/

---

# Development Rules

## Keep commits small.

Every commit should represent one completed feature.

Good examples:

* feat: player movement
* feat: tree gathering
* fix: collision bug
* docs: update roadmap

Bad examples:

* "many changes"

---

## One feature at a time.

Never work on multiple gameplay systems simultaneously.

---

## Always keep the project runnable.

The project should compile and launch after every completed feature.

---

## Explain code.

Complex systems should contain comments explaining:

* why
* not only what

---

## Modular code.

Each system should be independent.

Examples:

Movement

↓

Inventory

↓

Combat

↓

Building

↓

Networking

These systems should interact through clear interfaces.

---

# Current Progress

## Project Setup

* [x] Git repository
* [x] GitHub repository
* [x] README
* [x] ROADMAP
* [x] Folder structure
* [x] Node.js installed
* [x] npm installed
## Client Setup
- [x] Initialize Vite project
- [x] Configure TypeScript
- [x] Install PixiJS
- [x] Verify client runs

## Server Setup
- [x] Initialize Node.js project
- [x] Configure TypeScript
- [x] Install WebSocket library
- [x] Verify server runs

---

# Milestone 1

Development Environment

Goal:

Run the project locally.

Tasks:

* [x] Initialize Vite
* [x] Configure TypeScript
* [x] Install PixiJS
* [x] Install server dependencies
* [x] Verify build
* [x] Verify hot reload

Definition of Done:

Running one command launches the project.

---

# Milestone 2

Rendering Engine

Tasks:

* [x] Create game window
* [x] Render background
* [x] Game loop
* [x] Delta time
* [x] FPS counter
* [x] Resize handling

Definition of Done:

A smooth game window renders continuously.

---

# Milestone 3

Player

Tasks:

* [x] Player entity
* [x] Sprite
* [x] WASD movement
* [x] Rotation
* [x] Camera follow

Definition of Done:

A player moves around the screen.

---

# Milestone 4

World

Tasks:

* [x] World grid
* [x] Trees
* [x] Rocks
* [x] Bushes
* [x] Random generation

Definition of Done:

The world feels alive.

---

# Milestone 5

Resources

Tasks:

* [x] Hit detection
* [x] Resource drops
* [x] Inventory

Definition of Done:

Player gathers resources.

---


# Milestone 6

Building

Tasks:
* [ ] Add wooden walls, buildable by the player, costs maybe 20 trees, use the shortcut '2' to use it at the game
* [ ] Add an apple, edible by the player, costs 5 bushes, use the shortcut 'q' to use it in the game
* [ ] a ui at the bottom of the screen in the middle showing everything the player can use from tools to building blocks and so on.
* [ ] leveling bar at the top, make new items appear in the UI when a new level is reached
* [ ] Add Windmills to that list and make it cost a sum of wood and stones from the player to place, use the shortcut '4', it should cost (30 trees, 40 rocks)
* [ ] Add Spikes as well and make it slightly cheaper, use the shortcut '3'
* [ ] Placement preview if the player chose an item from the ui and wants to build it an he has the required materials
* [ ] Collision between buildable things

Example :
a player starts with nothing, he can see an empty level bar at the top, he has a UI at the bottom showing a wooden wall, and his two fists, the two items are at the bottom center, he can't place the wooden walls until he collects enough resources (20 trees for example), and while he is collecting resources he sees his level bar increase, when he reaches a new level (from 0 to 5), he gets to choose a new item, give him the option to choose the item (give him only one item for now per level to choose from, we will add more later), it should be displayed under the level bar and when clicked gets moved to the bottom ui, in the level 1 he could get the apple, level 2 is the wooden walls, level 3 is the spikes, level 4 is the windmill, he should start from an empty level 0, after that the level bar should continue to increase but without showing new items to choose.

Definition of Done:

Player can build structures, haveing a working level bar that increases with resources, a ui to show what the user can build

---

# Milestone 7

Combat

Tasks:

* [ ] Weapons (a simple sword, we will do the rest when we do the leveling Milestone)
* [ ] Swing animation
* [ ] Damage
* [ ] Health
* [ ] Death
* [ ] Respawn

Definition of Done:

Combat works.

---

# Milestone 8

levelling

Tasks:

* [ ] make a functioning level bar at the top
* [ ] implement "gold" gaining from windmills
* [ ] suggest new weapons / food types that cost more than normal apples / building blocks when a new level is reached
* [ ] make the new items appear in the user interface, at the bottom next to the other tools he has
* [ ] make the order of the unlocked upgrades hardcoded, not random
* [ ] stop leveling at level 20

Definition of Done:

a complete leveling system that unlocks new building blocks (windmills,wooden walls, stone walls, etc), new food (cheese that costs 20 apples, cake that costs 35), weapons (long sword with longer reach, a stick with more resources per hit an axe that is balanced between them)

---

# Milestone 9

Networking

Tasks:

* [ ] WebSocket server
* [ ] Player join
* [ ] Player leave
* [ ] Position sync
* [ ] Latency handling

Definition of Done:

Multiple players can play together.

---

# Milestone 10

Bots

Tasks:

* [ ] Movement AI
* [ ] Resource gathering
* [ ] Combat
* [ ] Building
* [ ] Respawn

Definition of Done:

Bots behave like players.

---

# Milestone 11

UI

Tasks:

* [ ] Health bar
* [ ] Inventory
* [ ] Crafting
* [ ] Leaderboard
* [ ] Minimap
* [ ] Chat

Definition of Done:

Core gameplay UI is complete.

---

# Milestone 12

Polish

Tasks:

* [ ] Sounds
* [ ] Music
* [ ] Particles
* [ ] Animations
* [ ] Screen shake
* [ ] Better art

---

# Milestone 13

Optimization

Tasks:

* [ ] Reduce allocations
* [ ] Optimize rendering
* [ ] Improve networking
* [ ] Profile CPU
* [ ] Profile memory

---


# AI Instructions

Whenever an AI contributes to this project:

1. Read this ROADMAP first.
2. Do not skip milestones.
3. Implement only the requested feature.
4. Do not refactor unrelated systems unless necessary.
5. Keep code modular.
6. Explain architectural decisions.
7. Prefer readability over cleverness.
8. Avoid duplicate code.
9. Keep commits focused on one feature.
10. If something is missing from the roadmap, suggest it before implementing.

---

# Definition of Success

A new contributor should be able to:

* Clone the repository.
* Run one command.
* Start the game.
* Read the documentation.
* Understand the architecture.
* Add a new feature without rewriting existing systems.

The project should feel like a small indie game engine rather than a collection of scripts.
