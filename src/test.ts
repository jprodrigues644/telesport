// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// @ts-ignore: missing type declarations for side-effect import of 'zone.js/testing'
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Karma exposes all files via window.__karma__.files
const allFiles = (window as any).__karma__.files;

// Keep only *.spec.ts files
const specFiles = Object.keys(allFiles).filter(file =>
  /\.spec\.ts$/.test(file)
);

// Dynamically import each test file
async function loadTests() {
  for (const file of specFiles) {
    await import(file);
  }
}

loadTests();
