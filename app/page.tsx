"use client"

import React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Edit3, Palette, Type, Sun, Moon, Copy, Check } from "lucide-react"

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
  { name: "Blue", bg: "#0f172a", border: "#1e293b", text: "#ffffff", accent: "#3b82f6", muted: "#64748b" },
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
  const [fontColorIndex, setFontColorIndex] = useState(0)
  const [fontSize, setFontSize] = useState(100)
  const [lineHeight, setLineHeight] = useState(105)
  const [letterSpacing, setLetterSpacing] = useState(-1)
  const [showCustomization, setShowCustomization] = useState(false)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const currentColorPresets = isDarkMode ? colorPresets : lightColorPresets
  const selectedColor = currentColorPresets[selectedColorIndex]
  const fontColor = currentColorPresets[fontColorIndex]

  const getCurrentFontFamily = () => {
    switch (activeView) {
      case "apple":
        return '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
      case "android":
        return 'Roboto, "Droid Sans", "Helvetica Neue", Arial, sans-serif'
      case "windows":
        return '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      case "cross":
        return 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      default:
        return '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = selectedColor.bg
    document.body.style.color = selectedColor.text
    document.body.style.fontFamily = getCurrentFontFamily()
  }, [selectedColor, activeView])

  const generateCSSCode = () => {
    const baseFontStack = fontStacks[activeView]
    const colorCSS = `color: ${fontColor.text};`
    const typographyCSS = `
  font-size: ${fontSize}%;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;`

    if (activeView === "cross" && baseFontStack.includes("@import")) {
      const [importLine, ...fontLines] = baseFontStack.split("\n")
      return `${importLine}

/* Typography with custom styling */
.typography-preview {
  ${fontLines.join("\n")}
  ${colorCSS}${typographyCSS}
}`
    } else {
      return `/* Typography with custom styling */
.typography-preview {
  ${baseFontStack.split("\n").slice(1, -1).join("\n")}
  ${colorCSS}${typographyCSS}
}`
    }
  }

  const scrollToCustomization = () => {
    setShowCustomization(true)
    setTimeout(() => {
      document.getElementById("customization-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getFrameworkImplementations = () => {
    const fontFamily = getCurrentFontFamily()
    const typographyCSS = `
  font-size: ${fontSize}%;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;`

    return {
      react: `const fontStyle = {
  fontFamily: '${fontFamily}',
  color: '${fontColor.text}',
  fontSize: '${fontSize}%',
  lineHeight: '${lineHeight}%',
  letterSpacing: '${letterSpacing}px'
};

<div style={fontStyle}>
  Your content
</div>`,

      tailwind: `/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'system': [${fontFamily
          .split(", ")
          .map((f) => `'${f.replace(/"/g, "")}'`)
          .join(", ")}]
      },
      fontSize: {
        'custom': '${fontSize}%'
      },
      lineHeight: {
        'custom': '${lineHeight}%'
      },
      letterSpacing: {
        'custom': '${letterSpacing}px'
      }
    }
  }
}

/* Usage */
<div className="font-system text-custom leading-custom tracking-custom" 
     style={{color: '${fontColor.text}'}}>
  Your content
</div>`,

      styledComponents: `import styled from 'styled-components';

const SystemText = styled.div\`
  font-family: ${fontFamily};
  color: ${fontColor.text};
  font-size: ${fontSize}%;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;
\`;

<SystemText>Your content</SystemText>`,

      vue: `<template>
  <div :style="fontStyle">
    Your content
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontStyle: {
        fontFamily: '${fontFamily}',
        color: '${fontColor.text}',
        fontSize: '${fontSize}%',
        lineHeight: '${lineHeight}%',
        letterSpacing: '${letterSpacing}px'
      }
    }
  }
}
</script>`,

      angular: `// component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-typography',
  template: \`
    <div [ngStyle]="fontStyle">
      Your content
    </div>
  \`
})
export class TypographyComponent {
  fontStyle = {
    'font-family': '${fontFamily}',
    'color': '${fontColor.text}',
    'font-size': '${fontSize}%',
    'line-height': '${lineHeight}%',
    'letter-spacing': '${letterSpacing}px'
  };
}`,

      svelte: `<script>
  const fontStyle = {
    fontFamily: '${fontFamily}',
    color: '${fontColor.text}',
    fontSize: '${fontSize}%',
    lineHeight: '${lineHeight}%',
    letterSpacing: '${letterSpacing}px'
  };
</script>

<div style={Object.entries(fontStyle)
  .map(([key, value]) => \`\${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`)
  .join('; ')}>
  Your content
</div>`,

      cssCustomProperties: `:root {
  --font-family-system: ${fontFamily};
  --font-color: ${fontColor.text};
  --font-size: ${fontSize}%;
  --line-height: ${lineHeight}%;
  --letter-spacing: ${letterSpacing}px;
}

.typography-system {
  font-family: var(--font-family-system);
  color: var(--font-color);
  font-size: var(--font-size);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
}

/* Usage */
<div class="typography-system">Your content</div>`,

      sass: `// _typography.scss
$font-family-system: ${fontFamily};
$font-color: ${fontColor.text};
$font-size: ${fontSize}%;
$line-height: ${lineHeight}%;
$letter-spacing: ${letterSpacing}px;

@mixin system-typography {
  font-family: $font-family-system;
  color: $font-color;
  font-size: $font-size;
  line-height: $line-height;
  letter-spacing: $letter-spacing;
}

.typography-system {
  @include system-typography;
}`,
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: selectedColor.bg,
        color: selectedColor.text,
        fontFamily: getCurrentFontFamily(),
      }}
    >
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
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ fontFamily: getCurrentFontFamily() }}
          >
            Compare System
            <span className="block" style={{ color: selectedColor.accent }}>
              Font Stacks
            </span>
          </h1>

          <p
            className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto"
            style={{
              color: selectedColor.muted,
              fontFamily: getCurrentFontFamily(),
            }}
          >
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
        style={{
          borderColor: selectedColor.border,
          fontFamily: getCurrentFontFamily(),
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: getCurrentFontFamily() }}>
              What is FontStack Studio?
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{
                color: selectedColor.muted,
                fontFamily: getCurrentFontFamily(),
              }}
            >
              A powerful tool for designers and developers to visualize and compare how system fonts render across
              different platforms and devices.
            </p>
          </div>

          {/* Grid cards with font family applied */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
            {[
              { icon: Type, title: "iOS Fonts", desc: "Experience San Francisco font rendering on Apple devices" },
              { icon: Palette, title: "Android Fonts", desc: "See how Roboto and Material Design fonts appear" },
              { icon: Edit3, title: "Windows Fonts", desc: "Compare Segoe UI and Windows system typography" },
              { icon: Type, title: "Cross-Platform", desc: "Universal fallback stacks that work everywhere" },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border"
                style={{
                  borderColor: selectedColor.border,
                  backgroundColor: `${selectedColor.bg}80`,
                  fontFamily: getCurrentFontFamily(),
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: selectedColor.accent }}
                >
                  {React.createElement(item.icon, {
                    className: "w-6 h-6",
                    style: { color: isDarkMode ? "#06120f" : "#ffffff" },
                  })}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: selectedColor.muted }}>
                  {item.desc}
                </p>
              </div>
            ))}
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
                          onClick={() => setTexts(defaultTexts)}
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

                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: selectedColor.muted }}>
                      Font Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {currentColorPresets.map((preset, index) => (
                        <button
                          key={`font-${preset.name}`}
                          onClick={() => setFontColorIndex(index)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all hover:scale-105 ${
                            fontColorIndex === index ? "ring-2" : ""
                          }`}
                          style={{
                            backgroundColor: "transparent",
                            borderColor: preset.text,
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
                      <button
                        onClick={() => {
                          setFontSize(100)
                          setLineHeight(105)
                          setLetterSpacing(-1)
                        }}
                        className="w-full px-3 py-2 rounded-lg text-sm border cursor-pointer transition-colors hover:bg-opacity-10"
                        style={{
                          color: selectedColor.muted,
                          borderColor: selectedColor.border,
                          backgroundColor: "transparent",
                        }}
                      >
                        Reset Typography
                      </button>
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
            <div className="grid grid-cols-1 gap-8">
              {/* Typography Preview - Now Full Width */}
              <section
                className="border rounded-2xl overflow-hidden shadow-2xl p-8"
                style={{
                  backgroundColor: selectedColor.bg,
                  borderColor: selectedColor.border,
                  fontFamily: getCurrentFontFamily(),
                  fontSize: `${fontSize}%`,
                  lineHeight: `${lineHeight}%`,
                  letterSpacing: `${letterSpacing}px`,
                }}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: selectedColor.accent }}>
                    Typography Preview
                  </h3>
                  <p className="text-sm" style={{ color: selectedColor.muted }}>
                    See how your selected font stack renders with different text styles
                  </p>
                </div>

                {isEditing ? (
                  <textarea
                    value={texts.heading1}
                    onChange={(e) => setTexts((prev) => ({ ...prev, heading1: e.target.value }))}
                    className="w-full font-extrabold leading-tight tracking-tight mb-4 bg-transparent border-0 resize-none outline-none"
                    style={{
                      color: fontColor.text,
                      fontSize: `${fontSize * 0.04}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                    rows={2}
                  />
                ) : (
                  <h1
                    className="font-extrabold leading-tight tracking-tight mb-4"
                    style={{
                      color: fontColor.text,
                      fontSize: `${fontSize * 0.04}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                  >
                    {texts.heading1}
                  </h1>
                )}

                {isEditing ? (
                  <textarea
                    value={texts.heading2}
                    onChange={(e) => setTexts((prev) => ({ ...prev, heading2: e.target.value }))}
                    className="w-full font-bold leading-tight tracking-tight mb-4 bg-transparent border-0 resize-none outline-none"
                    style={{
                      color: fontColor.text,
                      fontSize: `${fontSize * 0.025}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                    rows={2}
                  />
                ) : (
                  <h2
                    className="font-bold leading-tight tracking-tight mb-4"
                    style={{
                      color: fontColor.text,
                      fontSize: `${fontSize * 0.025}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                  >
                    {texts.heading2}
                  </h2>
                )}

                {isEditing ? (
                  <textarea
                    value={texts.heading3}
                    onChange={(e) => setTexts((prev) => ({ ...prev, heading3: e.target.value }))}
                    className="w-full font-semibold leading-snug mb-3 bg-transparent border-0 resize-none outline-none"
                    style={{
                      color: fontColor.accent,
                      fontSize: `${fontSize * 0.02}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                    rows={1}
                  />
                ) : (
                  <h3
                    className="font-semibold leading-snug mb-3"
                    style={{
                      color: fontColor.accent,
                      fontSize: `${fontSize * 0.02}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
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
                    onChange={(e) => setTexts((prev) => ({ ...prev, paragraph: e.target.value }))}
                    className="w-full leading-relaxed bg-transparent border-0 resize-none outline-none"
                    style={{
                      color: fontColor.muted,
                      fontSize: `${fontSize * 0.016}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                    rows={4}
                  />
                ) : (
                  <p
                    className="leading-relaxed"
                    style={{
                      color: fontColor.muted,
                      fontSize: `${fontSize * 0.016}rem`,
                      lineHeight: `${lineHeight}%`,
                      letterSpacing: `${letterSpacing}px`,
                    }}
                  >
                    {texts.paragraph}
                  </p>
                )}

                <div className="mt-8 pt-6 border-t" style={{ borderColor: selectedColor.border }}>
                  <p
                    className="font-medium mb-2"
                    style={{
                      color: fontColor.muted,
                      fontSize: `${fontSize * 0.014}rem`,
                    }}
                  >
                    Sample Text Sizes:
                  </p>
                  <div className="space-y-2">
                    <p
                      style={{
                        color: fontColor.muted,
                        fontSize: `${fontSize * 0.012}rem`,
                      }}
                    >
                      12px - Caption text
                    </p>
                    <p
                      style={{
                        color: fontColor.muted,
                        fontSize: `${fontSize * 0.014}rem`,
                      }}
                    >
                      14px - Body small
                    </p>
                    <p
                      style={{
                        color: fontColor.text,
                        fontSize: `${fontSize * 0.016}rem`,
                      }}
                    >
                      16px - Body regular
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        color: fontColor.text,
                        fontSize: `${fontSize * 0.018}rem`,
                      }}
                    >
                      18px - Body large
                    </p>
                    <p
                      className="font-semibold"
                      style={{
                        color: fontColor.text,
                        fontSize: `${fontSize * 0.02}rem`,
                      }}
                    >
                      20px - Heading small
                    </p>
                  </div>
                </div>
              </section>

              <section
                className="border rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: selectedColor.bg,
                  borderColor: selectedColor.border,
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: selectedColor.accent }}>
                      CSS Code Preview
                    </h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(generateCSSCode())}
                      className="px-3 py-1 rounded-lg text-sm font-medium border transition-colors hover:bg-opacity-10"
                      style={{
                        borderColor: selectedColor.border,
                        color: selectedColor.muted,
                        backgroundColor: "transparent",
                      }}
                    >
                      Copy Code
                    </button>
                  </div>
                  <pre
                    className="text-sm overflow-x-auto p-4 rounded-lg border"
                    style={{
                      backgroundColor: `${selectedColor.border}20`,
                      borderColor: selectedColor.border,
                      color: selectedColor.text,
                      fontFamily:
                        'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                  >
                    <code>{generateCSSCode()}</code>
                  </pre>
                </div>
              </section>
            </div>

            {/* Framework Specific Implementation Section */}
            <section
              className="border rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: selectedColor.bg,
                borderColor: selectedColor.border,
              }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ color: selectedColor.accent }}>
                  Framework Specific Implementation
                </h3>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                  {Object.entries(getFrameworkImplementations()).map(([framework, code]) => {
                    const frameworkNames: { [key: string]: string } = {
                      react: "React/JSX",
                      tailwind: "Tailwind CSS",
                      styledComponents: "Styled Components",
                      vue: "Vue.js",
                      angular: "Angular",
                      svelte: "Svelte",
                      cssCustomProperties: "CSS Custom Properties",
                      sass: "Sass/SCSS",
                    }

                    return (
                      <div key={framework}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">{frameworkNames[framework]}</h4>
                          <button
                            onClick={() => copyToClipboard(code, framework)}
                            className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium border transition-all hover:scale-105"
                            style={{
                              borderColor: selectedColor.border,
                              color: copiedStates[framework] ? selectedColor.accent : selectedColor.muted,
                              backgroundColor: "transparent",
                            }}
                          >
                            {copiedStates[framework] ? (
                              <>
                                <Check className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre
                          className="text-sm overflow-x-auto p-4 rounded-lg border mb-4"
                          style={{
                            backgroundColor: `${selectedColor.border}20`,
                            borderColor: selectedColor.border,
                            color: selectedColor.text,
                            fontFamily:
                              'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                          }}
                        >
                          <code>{code}</code>
                        </pre>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Implementation Methods Section */}
            <section
              className="border rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: selectedColor.bg,
                borderColor: selectedColor.border,
              }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ color: selectedColor.accent }}>
                  Implementation Methods
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Global CSS</h4>
                    <pre
                      className="text-sm overflow-x-auto p-4 rounded-lg border mb-4"
                      style={{
                        backgroundColor: `${selectedColor.border}20`,
                        borderColor: selectedColor.border,
                        color: selectedColor.text,
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      }}
                    >
                      <code>{`/* Add to your main CSS file */
body {
  ${fontStacks[activeView].split("\n").slice(1, -1).join("\n")}
  color: ${fontColor.text};
}`}</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">CSS Classes</h4>
                    <pre
                      className="text-sm overflow-x-auto p-4 rounded-lg border mb-4"
                      style={{
                        backgroundColor: `${selectedColor.border}20`,
                        borderColor: selectedColor.border,
                        color: selectedColor.text,
                        fontFamily:
                          'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      }}
                    >
                      <code>{`.system-font {
  ${fontStacks[activeView].split("\n").slice(1, -1).join("\n")}
  color: ${fontColor.text};
}

/* Usage */
<div class="system-font">Your content</div>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Pro Tips Section */}
            <section
              className="border rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: selectedColor.bg,
                borderColor: selectedColor.border,
              }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6" style={{ color: selectedColor.accent }}>
                  Pro Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-lg border"
                      style={{ borderColor: selectedColor.border, backgroundColor: `${selectedColor.border}10` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: selectedColor.accent }}>
                        Font Loading Performance
                      </h4>
                      <p className="text-sm" style={{ color: selectedColor.muted }}>
                        System fonts load instantly since they're already installed. This eliminates FOUT (Flash of
                        Unstyled Text) and improves Core Web Vitals.
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-lg border"
                      style={{ borderColor: selectedColor.border, backgroundColor: `${selectedColor.border}10` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: selectedColor.accent }}>
                        Accessibility Benefits
                      </h4>
                      <p className="text-sm" style={{ color: selectedColor.muted }}>
                        Users can override system fonts with their preferred accessibility fonts, ensuring better
                        readability for users with dyslexia or visual impairments.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-lg border"
                      style={{ borderColor: selectedColor.border, backgroundColor: `${selectedColor.border}10` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: selectedColor.accent }}>
                        Platform Consistency
                      </h4>
                      <p className="text-sm" style={{ color: selectedColor.muted }}>
                        Using system fonts ensures your app feels native on each platform, matching user expectations
                        and OS design guidelines.
                      </p>
                    </div>
                    <div
                      className="p-4 rounded-lg border"
                      style={{ borderColor: selectedColor.border, backgroundColor: `${selectedColor.border}10` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: selectedColor.accent }}>
                        Fallback Strategy
                      </h4>
                      <p className="text-sm" style={{ color: selectedColor.muted }}>
                        Always include generic fallbacks (sans-serif, serif, monospace) at the end of your font stack
                        for maximum compatibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </div>
  )
}
