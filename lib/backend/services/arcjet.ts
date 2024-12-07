import arcjet, {
  ArcjetDecision,
  detectBot,
  shield,
  tokenBucket,
} from '@arcjet/next'
import { NextRequest } from 'next/server'
import kink from '~/lib/shared/settings/errors'
import { IS_LOCAL } from '~/lib/shared/utilities/host'
import { hasRequestSecret } from './auth'

export const PROTECTOR = arcjet({
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
      refillRate: 20, // Refill 5 tokens per interval
      interval: 5, // Refill every 10 seconds
      capacity: 20, // Bucket capacity of 10 tokens
    }),
  ],
})

export async function protect(
  req: NextRequest,
  props: { requested: number },
) {
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
