---
name: audit-website
description: Comprehensive website audit covering accessibility, performance, SEO, security, and best practices. Use when asked to "audit my website", "check my site", "review my website", or similar requests for overall site health assessment.
---

# Website Audit

Comprehensive website audit skill for evaluating overall site health across multiple dimensions.

## Audit Areas

### 1. Performance Audit
- **Loading Speed**: First Contentful Paint, Largest Contentful Paint
- **Interactivity**: Time to Interactive, Interaction to Next Paint
- **Visual Stability**: Cumulative Layout Shift
- **Resource Optimization**: Image compression, code minification, caching

### 2. Accessibility Audit
- **WCAG Compliance**: Level A, AA conformance
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Reader Support**: Proper ARIA labels, semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Alt Text**: All images have descriptive alternatives

### 3. SEO Audit
- **Meta Tags**: Title, description, Open Graph
- **Heading Structure**: Proper H1-H6 hierarchy
- **Indexability**: robots.txt, sitemap.xml
- **Mobile-Friendliness**: Responsive design

### 4. Security Audit
- **HTTPS**: SSL certificate validity
- **Headers**: CSP, X-Frame-Options, HSTS
- **Dependencies**: Outdated packages with vulnerabilities
- **Sensitive Data**: No exposed credentials or API keys

### 5. Best Practices
- **Code Quality**: Clean, maintainable code
- **Error Handling**: Proper error pages (404, 500)
- **Console Errors**: No JavaScript errors
- **Broken Links**: All links functional

## Audit Report Format

```
## Summary
Overall Score: X/100

## Critical Issues (Fix Immediately)
1. Issue description with location

## Warnings (Should Fix)
1. Issue description with recommendation

## Recommendations (Nice to Have)
1. Improvement suggestion
```

## Tools to Use
- Lighthouse (Chrome DevTools)
- WebPageTest
- Wave (accessibility)
- Google Search Console
