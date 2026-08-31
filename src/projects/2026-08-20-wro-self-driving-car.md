---
title: 'WRO Self-Driving Car'
summary: 'A palm-sized autonomous vehicle built for the WRO Future Engineers 2026 category — heading-based navigation on an STM32, vision-assisted only when the rules demand it, engineered cheap on purpose and documented down to the mistakes.'
date: 2026-08-20
repoUrl: 'https://github.com/ShammanRahin/WRO_TeamBluePrint'
whitepaperUrl: ''
cadUrl: ''
# Flagship 3D-viewer slot. Set viewer: true and add a modelUrl (glTF/GLB export)
# to enable the in-browser model. Left off until an export exists.
viewer: false
---

A four-wheeled autonomous vehicle, no larger than a paperback, built for the World Robotics Olympiad's Future Engineers category — a self-driving car challenge in which the vehicle must complete three laps of a walled track fully autonomously, with no wireless of any kind, then in the harder round obey randomly placed traffic-sign pillars and parallel-park itself into a bay barely longer than the car.

This project took Ghurab to the podium as the only team from Bangladesh to reach it in this category.

## The idea

Build the whole thing cheap on purpose, and let engineering do the work a bigger budget usually does. The vehicle runs on two stacked single-sided PCBs etched locally in Dhaka — a process with no plated through-holes and no ground plane, coarse enough that a trace cannot pass between two adjacent header pins. Rather than fight that, we made board *placement* the design problem and shipped a working car on hardware a commercial fab would have dismissed.

## Key decisions

**Heading, not geometry, is the source of truth.** The car holds a straight line on its gyro and terminates every turn on *measured heading*, never on how far it believes it steered — because tyre slip corrupts any steering-angle estimate, and the gyro reports where the car is actually pointing. Heading is re-referenced to the nearest 90° at each corner, bounding drift to a single straightaway.

**One gear changed everything.** Ungeared, the drive motor pushed the car to an uncontrollable 2.79 m/s with coarse odometry and a ~7 ms window to read the coloured corner lines. A 5:1 reduction dropped it to 0.70 m/s, quadrupled odometry resolution, and opened the line-reading window to ~29 ms — turning three separate problems into non-problems for the price of a gear.

**Compute is split and inspectable.** An STM32 microcontroller runs the entire Open round deterministically. A Raspberry Pi 4B with a 160° fisheye camera is added *only* for the Obstacle round, purely to classify red and green pillars — and it sits on a physically separate power harness that is unplugged for the Open round, so "no Pi in the Open round" is a claim a judge can verify by inspection, not a software flag to trust.

**Steering is open-loop by design.** A parallelogram tie-bar linkage on a single servo, ±35° lock, 157 mm turn radius. It has no position feedback, because it doesn't need any: the loop that matters is closed through the gyro. A magnetic steering encoder was designed in early, then deliberately removed once we understood our own navigation had already solved the problem it was meant to solve.

## What the build taught us that the simulation couldn't

We built the wrong steering first. A kinematic Monte-Carlo and a friction simulation both ranked a single central-pivot axle as roughly three times more robust than the alternative — so we built it, and it was wrong: rotating the whole axle translates each front wheel fore-and-aft by ±30 mm, eating a third of our parking clearance for zero navigational gain. The simulation had never modelled the vehicle's swept body during a turn. The build found the term the model was missing. We kept the original study, unedited, as a record.

We also found — first in simulation, then confirmed — that the textbook two-arc parallel park is geometrically *impossible* at our steering lock, and that the problem is scale-invariant, so a smaller car can't escape it. The car parks with a slower multi-point shuffle closed on gyro heading instead.

## Documentation

The full engineering record for this vehicle is public: every locked parameter, every decision paired with the reasoning behind it, dated blocks where the build overruled the design, and the simulations that back each claim — including the mistakes, with dates on them. It stays public for at least a year after the event, as the competition rules require.

The build blueprint lives in [its own public repository](https://github.com/ShammanRahin/WRO_TeamBluePrint), separate from this site — linked above as the source repo.
