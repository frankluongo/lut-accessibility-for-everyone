# Accesibility For Everyone

## 01 Introduction

Course intro

## 02 What Is A11y

- We have `A`, `AA` and `AAA` standards for WCAG Guidelines
- We should aim for `AA` for any standard website

### Four Categories of Accessibility

1. Vision
2. Cognitive
3. Mobility
4. Hearing

## 03 Semantic HTML

- Quit using `div` all the time
- Use `header`, `footer`, `main` and `section` tags

## 04 Semantic Forms

- Whoa. `datalist` is a dope.

## 05 Semantic Contents

- Check out [Inclusive Components](https://inclusive-components.design/)
- Use `dl` (data list), `dt` and `dd` for "stats"
- Use `details` and `summary` for an accordion

## 06 Color Contrast

- [Color Contrast](https://contrast-ratio.com/)
- [Accessible Brand Colors](https://abc.useallfive.com/)
- [Who Can Use](https://whocanuse.com/)
- Chrome Dev Tools also includes tools for color contrast and vision impairments
- The "Rendering" Tab will simulate impairments

## 07 Text Alternatives

- Always use `alt`
- An `alt` with an empty string lets the screen reader know that the image is decorative
- HTML Videos allow inputting of captions

## 08 CSS Tricks

- You can use `css` to visually hide elements but allow screen readers to see them
- Do not rely on color alone for hover effects (or focus effects)

## 09 Testing App

- Install / Set Up App

## 10 Accessible Animations

- Use `@media (prefers-reduced-motion)` to turn off animations

## 11 Testing In Development

## 12 Keeping Focus

- Use `tabindex` to indicate focus
- Use `React Modal` for Modals since they have already worked all the kinks out

## 13 Manual Testing

- Use `Wave` Browser Extension
- Use `aXe` DevTools

## 14 Screen Readers

## 15 Intro to Pa11y

## 16 Basic Pa11y Tests

## 17 Advanced Options

## 18 Multiple Tests

## 19 Pa11y Reports

## 20 Automating Pa11y
