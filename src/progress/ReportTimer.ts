import { logStatus } from "../log/logStatus.js";
import { ReadCounter } from "./ReadCounter.js";
import { calculateGigabyteRate } from "./calculateGigabyteRate.js";

const STATUS_REPORT_INTERVAL_MS = 10 * 1000;

/**
 * Helper class to periodically report progress based on the number
 * of bytes read.
 */
export class ReportTimer {
  private totalBytes: number;
  private readCounter: ReadCounter;
  private intervalRef: ReturnType<typeof setInterval>;
  private startTimestampMs: number;

  constructor(totalBytes: number, readCounter: ReadCounter) {
    this.totalBytes = totalBytes;
    this.readCounter = readCounter;
    this.startTimestampMs = Date.now();

    this.intervalRef = setInterval(() => {
      this.report();
    }, STATUS_REPORT_INTERVAL_MS);
    this.intervalRef.unref();
  }

  /**
   * Reports process to stdout.
   */
  report() {
    if (this.totalBytes === 0) {
      // Avoids division-by-zero and NaNs below.
      return;
    }

    const readBytes = this.readCounter.getReadBytes();
    const percentage = (readBytes / this.totalBytes) * 100;
    const rate = calculateGigabyteRate(this.startTimestampMs, readBytes);

    const formattedPercentage = percentage.toFixed(0);
    const formattedRate = rate.toFixed(2);

    const minutesPassed = (Date.now() - this.startTimestampMs) / 1000 / 60;
    const minutesTotal = (this.totalBytes / readBytes) * minutesPassed;
    const minutesLeftFormatted = (minutesTotal - minutesPassed).toFixed(0);

    logStatus(
      `Done: ${formattedPercentage}% at rate ${formattedRate}GB/sec. Time left ${minutesLeftFormatted} minutes.`
    );
  }

  /**
   * Stops progress reporting.
   */
  stop() {
    clearInterval(this.intervalRef);
  }
}
