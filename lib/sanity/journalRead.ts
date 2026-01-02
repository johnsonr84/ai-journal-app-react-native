import { defineQuery } from "groq";
import type {
  USER_JOURNAL_ENTRIES_QUERYResult,
  USER_JOURNAL_ENTRIES_WITH_DATE_RANGE_QUERYResult,
} from "../../sanity/sanity.types";
import { sanityClient } from "./client";

/**
 * Edge-safe journal read helpers.
 *
 * This file intentionally contains ONLY read/query logic so it can be safely
 * imported from Vercel Edge Functions without pulling in client-only modules
 * (Expo, image upload helpers, etc).
 */

// GROQ Queries - defined as module-level constants for Sanity typegen
export const USER_JOURNAL_ENTRIES_QUERY = defineQuery(`*[
  _type == "journalEntry"
  && userId == $userId
] | order(createdAt desc) {
  _id,
  title,
  content,
  mood,
  createdAt,
  aiGeneratedCategory->{
    title,
    color
  }
}`);

export const USER_JOURNAL_ENTRIES_WITH_DATE_RANGE_QUERY = defineQuery(`*[
  _type == "journalEntry"
  && userId == $userId
  && createdAt >= $startDate
  && createdAt <= $endDate
] | order(createdAt desc) {
  _id,
  title,
  content,
  mood,
  createdAt,
  aiGeneratedCategory->{
    title,
    color
  }
}`);

export const fetchJournalEntries = async (
  userId: string
): Promise<USER_JOURNAL_ENTRIES_QUERYResult> => {
  try {
    const entries = await sanityClient.fetch(USER_JOURNAL_ENTRIES_QUERY, {
      userId,
    });
    return entries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }
};

export const fetchJournalEntriesWithDateRange = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<USER_JOURNAL_ENTRIES_WITH_DATE_RANGE_QUERYResult> => {
  try {
    const entries = await sanityClient.fetch(
      USER_JOURNAL_ENTRIES_WITH_DATE_RANGE_QUERY,
      {
        userId,
        startDate,
        endDate,
      }
    );
    return entries;
  } catch (error) {
    console.error("Error fetching journal entries with date range:", error);
    throw error;
  }
};


