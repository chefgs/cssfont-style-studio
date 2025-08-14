"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Edit3, Palette, Type, Sun, Moon } from "lucide-react"

const fontStacks = {
  apple: `/* Apple system stack (renders San Francisco on macOS/iOS) */
font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;`,
  android: `/* Android system stack (renders Roboto) */
font-family: Roboto, "Droid Sans", "Helvetica Neue", Arial, sans-serif;`,
  windows: `/* Windows system stack (renders Segoe UI) */
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;`,
  cross: `/* Cross-platform fallback (SF-like) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

font-family: Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;`,
}

const defaultTexts = {
  heading1: "See what you can do.",
  heading2: "Beautiful typography with system stacks.",
  heading3: "Apple view: San Francisco (via -apple-system)",
  heading4: "Other view: Inter / Segoe UI / Roboto fallback",
  paragraph:
    "Toggle between different platform-specific font stacks to see how typography renders across iOS, Android, Windows, and cross-platform environments.",
}

const colorPresets = [
  { name: "Default", bg: "#121318", border: "#1b1d24", text: "#ffffff", accent: "#2dd4bf", muted: "#9aa1ad" },
  { name: "Purple", bg: "#1a1625", border: "#2d2438", text: "#ffffff", accent: "#a855f7", muted: "#a78bfa" },
  { name: "Blue", bg: "#0f172a", border: "#1e293b", text: "#ffffff", accent: "#3b82f6", muted: "#94a3b8" },
  { name: "Green", bg: "#0f1419", border: "#1f2937", text: "#ffffff", accent: "#10b981", muted: "#6ee7b7" },
  { name: "Orange", bg: "#1c1917", border: "#292524", text: "#ffffff", accent: "#f97316", muted: "#fdba74" },
]

const lightColorPresets = [
  { name: "Default", bg: "#ffffff", border: "#e5e7eb", text: "#111827", accent: "#0d9488", muted: "#6b7280" },
  { name: "Purple", bg: "#faf5ff", border: "#e9d5ff", text: "#581c87", accent: "#7c3aed", muted: "#8b5cf6" },
  { name: "Blue", bg: "#f8fafc", border: "#e2e8f0", text: "#0f172a", accent: "#2563eb", muted: "#64748b" },
  { name: "Green", bg: "#f0fdf4", border: "#dcfce7", text: "#14532d", accent: "#059669", muted: "#16a34a" },
  { name: "Orange", bg: "#fff7ed", border: "#fed7aa", text: "#9a3412", accent: "#ea580c", muted: "#f97316" },
]

export default function FontStackDemo() {
  const [activeView, setActiveView] = useState<"apple" | "android" | "windows" | "cross">("apple")
  const [isEditing, setIsEditing] = useState(false)
  const [texts, setTexts] = useState(defaultTexts)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [fontSize, setFontSize] = useState(100)
  const [lineHeight, setLineHeight] = useState(105)
  const [letterSpacing, setLetterSpacing] = useState(-1)
  const [showCustomization, setShowCustomization] = useState(false)

  const currentColorPresets = isDarkMode ? colorPresets : lightColorPresets
  const selectedColor = currentColorPresets[selectedColorIndex]

  const handleTextChange = (key: keyof typeof texts, value: string) => {
    setTexts((prev) => ({ ...prev, [key]: value }))
  }

  const resetTexts = () => {
    setTexts(defaultTexts)
  }

  const scrollToCustomization = () => {
    setShowCustomization(true)
    setTimeout(() => {
      document.getElementById("customization-section")?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  useEffect(() => {
    document.body.style.backgroundColor = selectedColor.bg
    document.body.style.color = selectedColor.text
  }, [selectedColor])

  return (
    <div className="min-h-screen" style={{ backgroundColor: selectedColor.bg, color: selectedColor.text }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{
          backgroundColor: `${selectedColor.bg}95`,
          borderColor: selectedColor.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Type className="w-8 h-8" style={{ color: selectedColor.accent }} />
              <h1 className="text-xl font-bold">FontStack Studio</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg border transition-colors"
                style={{
                  borderColor: selectedColor.border,
                  backgroundColor: "transparent",
                }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" style={{ color: selectedColor.muted }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: selectedColor.muted }} />
                )}
              </button>

              <button
                onClick={scrollToCustomization}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: selectedColor.accent,
                  color: isDarkMode ? "#06120f" : "#ffffff",
                }}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Compare System
            <span className="block" style={{ color: selectedColor.accent }}>
              Font Stacks
            </span>
          </h1>

          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: selectedColor.muted }}>
            Explore how typography renders across different operating systems. See the visual differences between iOS,
            Android, Windows, and cross-platform font stacks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToCustomization}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              style={{
                backgroundColor: selectedColor.accent,
                color: isDarkMode ? "#06120f" : "#ffffff",
              }}
            >
              Start Exploring
            </button>

            <button
              onClick={() => document.getElementById("what-is-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-xl font-semibold text-lg border transition-colors"
              style={{
                borderColor: selectedColor.border,
                color: selectedColor.text,
                backgroundColor: "transparent",
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6" style={{ color: selectedColor.muted }} />
        </div>
      </section>

      {/* What Is Section */}
      <section
        id="what-is-section"
        className="py-20 px-4 sm:px-6 lg:px-8 border-t"
        style={{ borderColor: selectedColor.border }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What is FontStack Studio?</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: selectedColor.muted }}>
              A powerful tool for designers and developers to visualize and compare how system fonts render across
              different platforms and devices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="text-center p-6 rounded-xl border"
              style={{
                borderColor: selectedColor.border,
                backgroundColor: `${selectedColor.bg}80`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: selectedColor.accent }}
              >
                <Type className="w-6 h-6" style={{ color: isDarkMode ? "#06120f" : "#ffffff" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">iOS Fonts</h3>
              <p className="text-sm" style={{ color: selectedColor.muted }}>
                Experience San Francisco font rendering on Apple devices
              </p>
            </div>

            <div
              className="text-center p-6 rounded-xl border"
              style={{
                borderColor: selectedColor.border,
                backgroundColor: `${selectedColor.bg}80`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: selectedColor.accent }}
              >
                <Palette className="w-6 h-6" style={{ color: isDarkMode ? "#06120f" : "#ffffff" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Android Fonts</h3>
              <p className="text-sm" style={{ color: selectedColor.muted }}>
                See how Roboto and Material Design fonts appear
              </p>
            </div>

            <div
              className="text-center p-6 rounded-xl border"
              style={{
                borderColor: selectedColor.border,
                backgroundColor: `${selectedColor.bg}80`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: selectedColor.accent }}
              >
                <Edit3 className="w-6 h-6" style={{ color: isDarkMode ? "#06120f" : "#ffffff" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Windows Fonts</h3>
              <p className="text-sm" style={{ color: selectedColor.muted }}>
                Compare Segoe UI and Windows system typography
              </p>
            </div>

            <div
              className="text-center p-6 rounded-xl border"
              style={{
                borderColor: selectedColor.border,
                backgroundColor: `${selectedColor.bg}80`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: selectedColor.accent }}
              >
                <Type className="w-6 h-6" style={{ color: isDarkMode ? "#06120f" : "#ffffff" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cross-Platform</h3>
              <p className="text-sm" style={{ color: selectedColor.muted }}>
                Universal fallback stacks that work everywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      {showCustomization && (
        <section
          id="customization-section"
          className="py-20 px-4 sm:px-6 lg:px-8 border-t"
          style={{ borderColor: selectedColor.border }}
        >
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Customize Your Experience</h2>
              <p className="text-xl" style={{ color: selectedColor.muted }}>
                Fine-tune typography, colors, and content to see how different settings affect readability
              </p>
            </div>

            <div
              className="border rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: selectedColor.bg,
                borderColor: selectedColor.border,
              }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Customization Controls</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Text Editing Toggle */}
                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: selectedColor.muted }}>
                      Text Editing
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer transition-all hover:scale-105 ${
                          isEditing ? `text-[#06120f]` : `text-white bg-transparent border`
                        }`}
                        style={{
                          backgroundColor: isEditing ? selectedColor.accent : "transparent",
                          borderColor: selectedColor.border,
                        }}
                      >
                        {isEditing ? "Editing On" : "Enable Editing"}
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetTexts}
                          className="px-3 py-2 rounded-lg text-sm border cursor-pointer transition-colors hover:bg-opacity-10"
                          style={{
                            color: selectedColor.muted,
                            borderColor: selectedColor.border,
                            backgroundColor: "transparent",
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Color Presets */}
                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: selectedColor.muted }}>
                      Color Theme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentColorPresets.map((preset, index) => (
                        <button
                          key={preset.name}
                          onClick={() => setSelectedColorIndex(index)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all hover:scale-105 ${
                            selectedColorIndex === index ? "ring-2" : ""
                          }`}
                          style={{
                            backgroundColor: preset.bg,
                            borderColor: preset.border,
                            color: preset.text,
                            ringColor: preset.accent,
                          }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typography Controls */}
                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: selectedColor.muted }}>
                      Typography
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs mb-1" style={{ color: selectedColor.muted }}>
                          Font Size: {fontSize}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className="w-full"
                          style={{ accentColor: selectedColor.accent }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: selectedColor.muted }}>
                          Line Height: {lineHeight}%
                        </label>
                        <input
                          type="range"
                          min="90"
                          max="180"
                          value={lineHeight}
                          onChange={(e) => setLineHeight(Number(e.target.value))}
                          className="w-full"
                          style={{ accentColor: selectedColor.accent }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: selectedColor.muted }}>
                          Letter Spacing: {letterSpacing}px
                        </label>
                        <input
                          type="range"
                          min="-3"
                          max="3"
                          step="0.1"
                          value={letterSpacing}
                          onChange={(e) => setLetterSpacing(Number(e.target.value))}
                          className="w-full"
                          style={{ accentColor: selectedColor.accent }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Font Stack Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: selectedColor.muted }}>
                      Platform Font
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(fontStacks).map((stack) => (
                        <button
                          key={stack}
                          onClick={() => setActiveView(stack as keyof typeof fontStacks)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all hover:scale-105 ${
                            activeView === stack ? "ring-2" : ""
                          }`}
                          style={{
                            backgroundColor: activeView === stack ? selectedColor.accent : "transparent",
                            borderColor: selectedColor.border,
                            color: activeView === stack ? (isDarkMode ? "#06120f" : "#ffffff") : selectedColor.text,
                            ringColor: selectedColor.accent,
                          }}
                        >
                          {stack === "apple"
                            ? "iOS"
                            : stack === "android"
                              ? "Android"
                              : stack === "windows"
                                ? "Windows"
                                : "Cross-Platform"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Font Stack Demo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Code + Toggle */}
              <section
                className="border rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: selectedColor.bg,
                  borderColor: selectedColor.border,
                }}
              >
                <div
                  className="flex items-center gap-2.5 px-6 py-4 border-b bg-gradient-to-b"
                  style={{
                    borderColor: selectedColor.border,
                    backgroundImage: `linear-gradient(to bottom, ${selectedColor.bg}dd, ${selectedColor.bg})`,
                  }}
                >
                  <h3 className="text-lg font-semibold m-0" style={{ color: selectedColor.text }}>
                    Font Stack CSS
                  </h3>
                  <div
                    className="ml-auto text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: selectedColor.accent + "20",
                      color: selectedColor.accent,
                    }}
                  >
                    {activeView === "apple"
                      ? "iOS/macOS"
                      : activeView === "android"
                        ? "Android"
                        : activeView === "windows"
                          ? "Windows"
                          : "Universal"}
                  </div>
                </div>
                <pre
                  className="m-0 p-6 overflow-auto whitespace-pre-wrap text-sm leading-relaxed font-mono"
                  style={{ color: selectedColor.accent }}
                >
                  {fontStacks[activeView]}
                </pre>
              </section>

              {/* Right Panel - Typography Preview */}
              <section
                className="border rounded-2xl overflow-hidden shadow-2xl p-8"
                style={{
                  backgroundColor: selectedColor.bg,
                  borderColor: selectedColor.border,
                  fontFamily:
                    activeView === "apple"
                      ? '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
                      : activeView === "android"
                        ? 'Roboto, "Droid Sans", "Helvetica Neue", Arial, sans-serif'
                        : activeView === "windows"
                          ? '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                          : 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontSize: `${fontSize}%`,
                  lineHeight: `${lineHeight}%`,
                  letterSpacing: `${letterSpacing}px`,
                }}
              >
                {isEditing ? (
                  <textarea
                    value={texts.heading1}
                    onChange={(e) => handleTextChange("heading1", e.target.value)}
                    className="w-full text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-4 bg-transparent border-0 resize-none outline-none"
                    style={{ color: selectedColor.text }}
                    rows={2}
                  />
                ) : (
                  <h1
                    className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-4"
                    style={{ color: selectedColor.text }}
                  >
                    {texts.heading1}
                  </h1>
                )}

                {isEditing ? (
                  <textarea
                    value={texts.heading2}
                    onChange={(e) => handleTextChange("heading2", e.target.value)}
                    className="w-full text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4 bg-transparent border-0 resize-none outline-none"
                    style={{ color: selectedColor.text }}
                    rows={2}
                  />
                ) : (
                  <h2
                    className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4"
                    style={{ color: selectedColor.text }}
                  >
                    {texts.heading2}
                  </h2>
                )}

                {isEditing ? (
                  <textarea
                    value={texts.heading3}
                    onChange={(e) => handleTextChange("heading3", e.target.value)}
                    className="w-full text-xl lg:text-2xl font-semibold leading-snug mb-3 bg-transparent border-0 resize-none outline-none"
                    style={{ color: selectedColor.accent }}
                    rows={1}
                  />
                ) : (
                  <h3
                    className="text-xl lg:text-2xl font-semibold leading-snug mb-3"
                    style={{ color: selectedColor.accent }}
                  >
                    {activeView === "apple"
                      ? "iOS/macOS: San Francisco (via -apple-system)"
                      : activeView === "android"
                        ? "Android: Roboto (system default)"
                        : activeView === "windows"
                          ? "Windows: Segoe UI (system default)"
                          : "Cross-Platform: Inter / Segoe UI / Roboto fallback"}
                  </h3>
                )}

                {isEditing ? (
                  <textarea
                    value={texts.paragraph}
                    onChange={(e) => handleTextChange("paragraph", e.target.value)}
                    className="w-full text-base leading-relaxed bg-transparent border-0 resize-none outline-none"
                    style={{ color: selectedColor.muted }}
                    rows={4}
                  />
                ) : (
                  <p className="text-base leading-relaxed" style={{ color: selectedColor.muted }}>
                    {texts.paragraph}
                  </p>
                )}

                <div className="mt-8 pt-6 border-t" style={{ borderColor: selectedColor.border }}>
                  <p className="text-sm font-medium mb-2" style={{ color: selectedColor.muted }}>
                    Sample Text Sizes:
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs" style={{ color: selectedColor.muted }}>
                      12px - Caption text
                    </p>
                    <p className="text-sm" style={{ color: selectedColor.muted }}>
                      14px - Body small
                    </p>
                    <p className="text-base" style={{ color: selectedColor.text }}>
                      16px - Body regular
                    </p>
                    <p className="text-lg font-medium" style={{ color: selectedColor.text }}>
                      18px - Body large
                    </p>
                    <p className="text-xl font-semibold" style={{ color: selectedColor.text }}>
                      20px - Heading small
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
