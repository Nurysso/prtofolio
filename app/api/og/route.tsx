/*
This will generate dynamic OG images at runtime!
Access them via: https://dawood.page/api/og?title=dawood+developer
*/

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import React from 'react';

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Dawood Khan (Nurysso)'
  const subtitle = searchParams.get('subtitle') || 'Full Stack Developer & Open Source Creator'
  const project = searchParams.get('project') || ''

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1b26',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #2a2b36 2%, transparent 0%), radial-gradient(circle at 75px 75px, #2a2b36 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #7aa2f7 0%, #bb9af7 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              color: '#a9b1d6',
              marginBottom: 40,
            }}
          >
            {subtitle}
          </div>

          {/* Project Badge (if applicable) */}
          {project && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#7aa2f7',
                color: '#1a1b26',
                fontSize: 28,
                fontWeight: 'bold',
                padding: '12px 32px',
                borderRadius: '12px',
                marginTop: 20,
              }}
            >
              {project}
            </div>
          )}

          {/* Tech Stack */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              marginTop: 60,
              fontSize: 24,
              color: '#565f89',
            }}
          >
            <span>GoLang</span>
            <span>•</span>
            <span>Rust</span>
            <span>•</span>
            <span>React</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            fontSize: 24,
            color: '#565f89',
          }}
        >
          dwukn.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
