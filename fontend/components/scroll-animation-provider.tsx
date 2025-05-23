"use client"

import type React from "react"

import { useEffect } from "react"

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll(".reveal")

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
      const revealPoint = 150

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("active")
        }
      })
    }

    // Parallax effect
    const parallaxElements = document.querySelectorAll(".parallax")

    const parallaxEffect = () => {
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset
        const elementTop = element.getBoundingClientRect().top + scrollPosition
        const distanceFromTop = scrollPosition - elementTop
        const parallaxFactor = Number.parseFloat(element.getAttribute("data-parallax") || "0.2")

        if (element.classList.contains("parallax-bg")) {
          element.style.transform = `translateY(${distanceFromTop * parallaxFactor}px)`
        } else {
          element.style.transform = `translateY(${distanceFromTop * parallaxFactor}px)`
        }
      })
    }

    // Floating leaves animation
    const createLeaves = () => {
      const container = document.querySelector(".leaves-container")
      if (!container) return

      for (let i = 0; i < 10; i++) {
        const leaf = document.createElement("div")
        leaf.classList.add("leaf")
        leaf.style.left = `${Math.random() * 100}%`
        leaf.style.animationDelay = `${Math.random() * 10}s`
        leaf.style.animationDuration = `${10 + Math.random() * 10}s`
        container.appendChild(leaf)
      }
    }

    // Initialize
    window.addEventListener("scroll", revealOnScroll)
    window.addEventListener("scroll", parallaxEffect)
    revealOnScroll()
    parallaxEffect()
    createLeaves()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", revealOnScroll)
      window.removeEventListener("scroll", parallaxEffect)
    }
  }, [])

  return <>{children}</>
}
