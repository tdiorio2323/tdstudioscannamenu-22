# Agent Development Tools Guide

## Overview

The TD Studios cannabis menu platform includes a sophisticated **agents feature** - a comprehensive suite of development tools designed to streamline workflow, enable rapid prototyping, and facilitate automated code generation. These tools work together to create a powerful development environment for both technical and non-technical users.

## 🛠️ Core Agent Tools

### 1. Interactive Page Builder (`/__builder`)

**URL:** `http://localhost:8081/__builder`

A visual page creation interface that allows developers to:
- Design pages with live preview
- Configure title, body content, and buttons
- Choose from predefined button variants (default, secondary, outline, ghost, link)
- Generate clean React/TypeScript code automatically
- Create pages directly via development middleware

**Features:**
- Real-time code generation with syntax highlighting
- Customizable button configurations
- Live preview pane showing actual rendered output
- One-click page creation and routing integration

### 2. Authentication Card Builder (`/__auth-builder`)

**URL:** `http://localhost:8081/__auth-builder`

Specialized tool for creating brand authentication cards:
- Configure brand information (name, username, images)
- Set up social media buttons and links
- Generate complete authentication page components
- Export configurations for deployment

### 3. Mass Card Editor (`/__card-editor`)

**URL:** `http://localhost:8081/__card-editor`

Bulk editing interface for managing multiple authentication cards:
- Edit multiple brand cards simultaneously
- Batch operations for common changes
- Import/export card configurations
- Preview multiple cards in grid layout

### 4. Component Library (`/__components`)

**URL:** `http://localhost:8081/__components`

Centralized component showcase and documentation:
- Browse available UI components
- View component variations and props
- Copy code snippets for reuse
- Test component behavior interactively

## 🚀 Command Line Tools

### Page Generation Script

**Command:** `npm run gen:page`

**Usage:**
```bash
# Create single page
npm run gen:page "PageName:/route-path"

# Create multiple pages
npm run gen:page "About" "Contact:/contact-us" "Services"

# Create from CSV file
npm run gen:page --file pages.csv
```

**What it does:**
1. Generates React component file in `src/pages/`
2. Uses PascalCase naming convention
3. Includes shadcn/ui Card components by default
4. Automatically updates routing in `src/App.tsx`
5. Preserves existing routes and maintains proper order

**Generated Template:**
```tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PageName = () => {
  return (
    <div className="min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Scaffolded page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageName;
```

## 🔧 Development Middleware

### Vite Development Server Extensions

The agent tools are powered by custom Vite middleware that provides:

#### 1. Page Scaffolding API (`/__scaffold`)

**Endpoint:** `POST /__scaffold`

**Payload:**
```json
{
  "name": "PageName",
  "route": "/page-route",
  "code": "React component code"
}
```

**Functions:**
- Creates component files on-the-fly
- Updates App.tsx routing automatically
- Validates route conflicts
- Maintains proper import structure

#### 2. Asset Listing API (`/__list-public`)

**Endpoint:** `GET /__list-public?dir=folder-name`

**Functions:**
- Lists files in public directories
- Filters out unwanted files
- Supports multiple directory queries
- Used by shop management tools

**Allowed Directories:**
- `td slide` - Product slide images
- `shoppagepics` - Shop page pictures

## 🏗️ Architecture

### File Structure

```
src/
├── pages/
│   ├── Builder.tsx          # Page builder interface
│   ├── AuthBuilder.tsx      # Auth card builder
│   └── DynamicAuthCard.tsx  # Dynamic card renderer
├── components/
│   ├── AuthCardBuilder.tsx  # Builder component logic
│   ├── ComponentLibrary.tsx # Component showcase
│   └── MassCardEditor.tsx   # Bulk editor
scripts/
├── gen-page.mjs            # CLI page generation
├── generate-shop-manifest.mjs
└── capture-all-pages.js    # Screenshot generation
```

### Routing Architecture

**Development Routes** (Protected by development mode):
```tsx
{/* Dev-only builder routes */}
<Route path="/__builder" element={<Builder />} />
<Route path="/__auth-builder" element={<AuthBuilder />} />
<Route path="/__card-editor" element={<MassCardEditor />} />
<Route path="/__components" element={<ComponentLibrary />} />
```

**Generated Routes** (Added automatically):
- New pages are inserted above the catch-all route
- Maintains proper route precedence
- Preserves existing routing structure

## 🎯 Use Cases

### For Developers

1. **Rapid Prototyping:** Use `/__builder` to quickly create page layouts
2. **Component Testing:** Use `/__components` to test UI components
3. **Batch Operations:** Use CLI tools for creating multiple pages
4. **Code Generation:** Generate boilerplate with proper TypeScript types

### For Content Creators

1. **Brand Cards:** Use `/__auth-builder` to create branded landing pages
2. **Social Links:** Configure social media integration without coding
3. **Visual Editing:** Use drag-and-drop interfaces for content management

### For Project Management

1. **Bulk Updates:** Use `/__card-editor` for managing multiple brands
2. **Asset Management:** Leverage asset listing APIs for content organization
3. **Automation:** Use CLI scripts for repetitive tasks

## 🔄 Workflow Examples

### Creating a New Feature Page

1. **Via Web Interface:**
   ```
   Navigate to /__builder
   → Configure page details
   → Preview changes
   → Click "Create Page"
   → Page appears at specified route
   ```

2. **Via Command Line:**
   ```bash
   npm run gen:page "FeatureName:/features/new-feature"
   # Creates src/pages/FeatureName.tsx
   # Updates src/App.tsx with new route
   ```

### Creating Brand Authentication Cards

1. **Configure Brand Details:**
   ```
   Navigate to /__auth-builder
   → Set brand name, username, images
   → Configure social media buttons
   → Preview card appearance
   → Export configuration
   ```

2. **Deploy Configuration:**
   ```
   Place exported JSON in appropriate directory
   → Card becomes accessible at /brand-slug
   → Automatic routing via DynamicAuthCard
   ```

## 🛡️ Security & Best Practices

### Development Only
- Agent tools are only available in development mode
- Production builds exclude development middleware
- `/__*` routes are automatically filtered from production

### Code Generation Safety
- Generated code follows TypeScript standards
- Uses established component patterns
- Includes proper error boundaries
- Maintains consistent styling with shadcn/ui

### Route Management
- Automatic route conflict detection
- Preserves existing routing structure  
- Maintains proper route precedence
- Validates route parameters

## 🚀 Getting Started

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Access Agent Tools:**
   - Page Builder: `http://localhost:8081/__builder`
   - Auth Builder: `http://localhost:8081/__auth-builder`
   - Card Editor: `http://localhost:8081/__card-editor`
   - Components: `http://localhost:8081/__components`

3. **Use CLI Tools:**
   ```bash
   # Create pages via command line
   npm run gen:page "About:/about-us"
   
   # Generate screenshots
   npm run capture:all
   
   # Deploy via webhook
   npm run deploy:hook
   ```

4. **Generated Files:**
   - Components appear in `src/pages/`
   - Routes update automatically in `src/App.tsx`
   - View changes immediately in development server

The agents feature transforms the development experience by providing both visual and programmatic interfaces for rapid application development, making the TD Studios platform highly maintainable and extensible.