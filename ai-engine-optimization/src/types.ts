export interface PageResult {
  url: string;
  status: number;
  fetchedAt: string;
  rawHtml: string;
  mainText: string;
  title: string;
  h1: string;
  checks: PageChecks;
}

export interface PageChecks {
  crawlability: CrawlabilityResult;
  extractability: ExtractabilityResult;
  structuredData: StructuredDataResult;
  markdownAccess: MarkdownAccessResult;
  freshness: FreshnessResult;
  pageExperience: PageExperienceResult;
}

export interface CrawlabilityResult {
  score: number;
  maxScore: number;
  details: {
    returns200: boolean;
    robotsAllowsOAISearchBot: boolean;
    robotsAllowsGPTBot: boolean;
    robotsAllowsGooglebot: boolean;
    robotsAllowsGoogleExtended: boolean;
    sitemapExists: boolean;
    sitemapIncludesPage: boolean;
    isIndexable: boolean;
    hasCanonical: boolean;
    canonicalIsSelf: boolean;
    hasInternalLinksToPage: boolean;
  };
  notes: string[];
}

export interface ExtractabilityResult {
  score: number;
  maxScore: number;
  details: {
    mainContentInHtml: boolean;
    contentRatio: number;
    hasSemanticStructure: boolean;
    jsNotRequired: boolean;
    textLength: number;
    headingCount: number;
    listCount: number;
    tableCount: number;
  };
  notes: string[];
}

export interface StructuredDataResult {
  score: number;
  maxScore: number;
  details: {
    hasJsonLd: boolean;
    jsonLdTypes: string[];
    jsonLdMatchesContent: boolean;
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    hasMetaDescription: boolean;
    hasCanonical: boolean;
    hasBreadcrumbs: boolean;
    hasDates: boolean;
  };
  notes: string[];
}

export interface MarkdownAccessResult {
  score: number;
  maxScore: number;
  details: {
    llmsTxtExists: boolean;
    llmsTxtHasSummary: boolean;
    llmsTxtHasLinks: boolean;
    markdownVersionExists: boolean;
    markdownVersionIsClean: boolean;
    markdownIsDiscoverable: boolean;
  };
  notes: string[];
}

export interface FreshnessResult {
  score: number;
  maxScore: number;
  details: {
    sitemapHasLastmod: boolean;
    pageHasVisibleDates: boolean;
    publishedDate: string | null;
    updatedDate: string | null;
  };
  notes: string[];
}

export interface PageExperienceResult {
  score: number;
  maxScore: number;
  details: {
    pageSizeKb: number;
    imagesHaveAlt: boolean;
    buttonsHaveLabels: boolean;
    formsHaveLabels: boolean;
  };
  notes: string[];
}

export interface SiteAudit {
  url: string;
  crawledAt: string;
  pageCount: number;
  pages: PageResult[];
  robotsTxt: string | null;
  sitemap: SitemapData | null;
  scores: SiteScores;
}

export interface SitemapData {
  urls: string[];
  hasLastmod: boolean;
}

export interface SiteScores {
  crawlability: CategoryScore;
  extractability: CategoryScore;
  structuredData: CategoryScore;
  markdownAccess: CategoryScore;
  freshness: CategoryScore;
  pageExperience: CategoryScore;
  deterministicTotal: number;
  deterministicMax: number;
  deterministicPercent: number;
}

export interface CategoryScore {
  score: number;
  max: number;
  percent: number;
  label: string;
}
