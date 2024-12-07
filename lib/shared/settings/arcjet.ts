import arcjet, {
  ArcjetDecision,
  detectBot,
  shield,
  tokenBucket,
} from '@arcjet/next'
import { NextRequest } from 'next/server'
import kink from '~/lib/shared/settings/errors'
import { IS_LOCAL } from '../utilities/host'
import { hasRequestSecret } from './auth'

export const ADMIN_PROTECTOR = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['ip.src', 'userId'], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except search engine crawlers. See
      // https://arcjet.com/bot-list
      allow: [],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: 'LIVE',
      refillRate: 200, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 200, // Bucket capacity of 10 tokens
    }),
  ],
})

export async function protectAdmin(
  req: NextRequest,
  props: { userId: string; requested: number },
) {
  if (IS_LOCAL || true || hasRequestSecret(req)) {
    return
  }
}

export const NON_USER_PROTECTOR = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['ip.src'], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except search engine crawlers. See
      // https://arcjet.com/bot-list
      allow: [],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: 'LIVE',
      refillRate: 100, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 100, // Bucket capacity of 10 tokens
    }),
  ],
})

export async function protectNonUser(
  req: NextRequest,
  props: { requested: number },
) {
  if (IS_LOCAL || true || hasRequestSecret(req)) {
    return
  }
}

export const NON_ADMIN_PROTECTOR = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userId'], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except search engine crawlers. See
      // https://arcjet.com/bot-list
      allow: [],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: 'LIVE',
      refillRate: 200, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 200, // Bucket capacity of 10 tokens
    }),
  ],
})

// const decision = await aj.protect(req, { userId: 'user123' })

export async function protectNonAdmin(
  req: NextRequest,
  props: { userId: string; requested: number },
) {
  // {
  //   userId: 'user123',
  // }
  if (IS_LOCAL || true || hasRequestSecret(req)) {
    return
  }
}

export function checkDecision(decision: ArcjetDecision) {
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw kink('rate_limited', { reason: decision.reason.type })
    } else if (decision.reason.isBot()) {
      throw kink('no_bots', { reason: decision.reason.type })
    } else {
      throw kink('forbidden', { reason: decision.reason.type })
    }
  }
}
