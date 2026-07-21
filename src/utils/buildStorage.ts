import type { Build } from "../types/Build"
import type { BuildSave } from "../types/BuildSave"

const STORAGE_KEY = "savedBuilds"

/**
 * Generate a collision-resistant unique ID.
 * Uses crypto.randomUUID() when available, otherwise falls back to
 * a timestamp + random suffix.
 */
function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getBuilds(): BuildSave[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      // Fix #7 — validate that parsed value is actually an array
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? (parsed as BuildSave[]) : []
    }
  } catch (e) {
    console.error("Failed to parse saved builds", e)
  }
  return []
}

export function getBuild(id: string): BuildSave | undefined {
  const builds = getBuilds()
  return builds.find((b) => b.id === id)
}

export function saveBuild(build: Build): BuildSave | null {
  try {
    const builds = getBuilds()
    const now = new Date().toISOString()

    // Update existing
    if (build.id) {
      const index = builds.findIndex((b) => b.id === build.id)
      if (index !== -1) {
        const updated: BuildSave = {
          ...builds[index],
          name: build.buildName,
          updatedAt: now,
          build: { ...build },
        }
        builds[index] = updated
        localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
        return updated
      }
    }

    // Create new — Fix #10: collision-resistant ID
    const newId = generateId()
    const newBuild: BuildSave = {
      id: newId,
      name: build.buildName,
      createdAt: now,
      updatedAt: now,
      build: { ...build, id: newId },
    }
    builds.push(newBuild)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
    return newBuild
  } catch (e) {
    // Fix #6 — catch QuotaExceededError / unavailable storage
    console.error("Failed to save build", e)
    return null
  }
}

export function deleteBuild(id: string): boolean {
  try {
    let builds = getBuilds()
    builds = builds.filter((b) => b.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
    return true
  } catch (e) {
    // Fix #6 — catch storage errors on delete
    console.error("Failed to delete build", e)
    return false
  }
}
