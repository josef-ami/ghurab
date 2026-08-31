---
title: 'How we became the only Bangladeshi team to reach the WRO Future Engineers podium — and what it cost us'
description: 'Ghurab built a self-driving car at a fraction of the going cost, medalled at the WRO Future Engineers National Round, and learned the hard way that the thing that made us fast almost cost us the competition.'
date: 2026-08-20
tags: ['competition', 'build-log']
---

The World Robotics Olympiad's Future Engineers category is, on paper, a self-driving car problem. You build a four-wheeled vehicle no bigger than a paperback, and it has to drive itself around a walled track — three laps, fully autonomous, no remote control, no wireless of any kind — while a clock runs. Then, in the harder round, it has to do the same thing while obeying randomly placed traffic-sign pillars and finish by parallel-parking itself into a bay barely longer than the car.

We entered as Ghurab. We came out as the only team from Bangladesh to reach the podium in this category, with a bronze medal.

This post is the honest version of how that happened — the ingenuity we're proud of, and the self-inflicted disaster that nearly ended our run at 3 a.m. the night before. We're writing it the way we wish other teams had written theirs: not just *what* we built, but *why*, and where we got it wrong.

## The angle nobody expects: we were cheap on purpose

Most serious Future Engineers builds lean on expensive, off-the-shelf certainty — commercial fabrication, premium sensors, name-brand everything. We didn't have that budget. What we had instead was the willingness to solve problems with engineering rather than with a purchase order, and that turned out to be the whole story.

Our boards are two stacked single-sided PCBs, etched locally in Dhaka. The local process has no plated through-holes, which means no ground plane and a minimum trace-and-space so coarse that you physically cannot route a wire between two adjacent header pins. That's a real constraint most teams never touch. We designed around it — placement became the entire problem instead of routing — and shipped a working vehicle on hardware a commercial fab would have laughed at.

The single most valuable decision in the build cost nothing at all. Ungeared, our drive motor ran the car at 2.79 m/s, which is uncontrollably fast on a 3-metre track, gave us coarse odometry, and left a line-detection window of about 7 milliseconds — too short to reliably read the coloured lines that tell the car where the corners are. We added a 5:1 gear to the rear axle. Speed dropped to 0.70 m/s, odometry got four times finer, and the line-reading window opened up to nearly 29 milliseconds. One cheap gear turned three separate problems into non-problems. That's the ingenuity we mean: not spending our way out, but thinking our way out.

## Build the arena before you build the robot

Here's the thing that actually set us apart, and it happened before we had a robot at all.

Before writing a line of navigation code, we built the entire competition arena to spec — the walls, the lines, the dimensions — and an extensive testing rig on top of it, so we could stress-test the car over and over the moment it existed. The philosophy was simple: move fast and break things, then keep only what survives. By the time our robot was running, it had already been beaten on relentlessly. What was left was antifragile.

That's why our simulations and our hardware agreed with reality on competition day when it mattered. We'd already found the failure modes at home.

We'll come back to this testing rig, because it's also the villain of this story.

## What the car actually is

For the technically minded, here's the vehicle in brief:

- **Footprint:** 165 × 115 mm — a small fraction of the 300 × 200 mm limit.
- **Steering:** a parallelogram tie-bar linkage driven by a single servo, ±35° lock, giving a 157 mm turn radius. Fully open-loop.
- **Drive:** one geared motor through a 5:1 reduction to a solid rear axle — no differential. Top speed 0.70 m/s.
- **Brains:** an STM32 microcontroller runs everything in the Open round, fully deterministically. A Raspberry Pi 4B with a 160° fisheye camera is added *only* for the Obstacle round, purely to classify red and green pillars.

The navigation core is heading-based, not geometry-based. The car holds a straight line on its gyro, watches a downward colour sensor for the orange and blue corner lines, and — critically — **ends each turn on measured heading rather than on how far it thinks it steered.** Tyre slip corrupts any steering-angle estimate; the gyro doesn't lie about which way the car is actually pointing. Re-referencing heading at every corner keeps drift bounded to a single straightaway.

The Pi lives on a physically separate power harness that is *unplugged* for the Open round. So "no Pi in the Open round" isn't a software setting we ask judges to trust — the Pi is not electrically present. It's an inspectable claim.

If you want the full engineering record — every locked parameter, every decision with its reasoning, and the simulations behind them — it's all public in our build repository. Including the mistakes, with dates on them.

## The medal, and the honest reason it was bronze

We were the top-performing team for what we set out to prove: the only Bangladeshi entry to qualify in this category. The medal was bronze because our total score fell below the threshold for silver or gold — and it fell there for one specific reason. We were strong in the Open round. We struggled in the Obstacle round.

Two things hurt us there, and we own both.

The first is that the Obstacle round is genuinely hard. Obeying pillars while threading gaps and then parallel-parking into a bay only 1.5× the car's length is a different order of problem, and we rotated through a whole sequence of algorithms and strategies before landing on one that actually worked. We found, through simulation we then confirmed, that the textbook two-arc parallel park is geometrically *impossible* at our steering lock — it misses by 25.6 mm, and the problem is scale-invariant, so making the car smaller doesn't help. We replaced it with a slower multi-point shuffle closed on gyro heading. That's the right answer, but it cost us time we were still buying back on the day.

The second reason is entirely our own fault, and it's the part every team should learn from.

## We calibrated our robot to death

We got so enamoured with calibrating — tuning the vision, perfecting the sensors, running the rig again and again — that on the day of the competition, our robot **literally ran out of battery before the Obstacle round could start.**

The same relentless stress-testing that made the car antifragile is the thing that drained the pack when it counted. There's a lesson in that we're still sitting with: reliability engineering and knowing when to *stop* engineering are two different disciplines, and we'd mastered exactly one of them.

## The buck converter, the drunk friend, and the drive to Gazipur

If you want the single moment that captures what this competition actually costs, it was 3 a.m. the night before.

The buck converter — the part that steps our battery down to feed the electronics — burnt out. Dead. Hours before we had to leave for the venue, with no spare.

So the two of us, sleep-deprived past the point of good decisions, got in a car and drove from Uttara all the way to the Islamic University of Technology in Gazipur, because a friend there had the part we needed. That friend was, on this particular night, extremely drunk after a party at the university — a party our teammate had skipped, being simply too cool for it. We got the converter. We also got some genuinely incredible 3 a.m. food out of it — chicken chaap and fried rice — which, in the moment, felt like the only thing holding the team together. Then we drove back to Uttara, fixed the robot, worked until dawn, and at 8 a.m. drove to United International University to compete.

And we did well. On no sleep, on a converter sourced from a drunk friend at midnight, we medalled.

## What we'd tell another team

Simulate — but build the thing early. Our simulations were good work, and we'd do them again. But the build found failure modes the model couldn't see, every time. Our steering study ranked the right linkage as "strictly dominated" because it never modelled the vehicle's swept body during a turn. We only found that out by building the wrong steering first.

Test relentlessly — but budget your battery like it's a scored resource, because on the day, it is.

And when the buck converter dies at 3 a.m., know a guy in Gazipur.

We're still early. This was a competition team's national round, not a company's product launch, and we're honest about that. But it's the real record of what this team can do when it's cornered — and it's why we think it's worth backing us now, before this becomes something bigger.
