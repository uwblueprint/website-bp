/** Highlighted Project */
export type HighlightedProject = {
  readonly name: string;
  readonly type: string;
  readonly terms: string;
  readonly caseStudyUrl: string;
  readonly githubUrl: string;
  readonly about: string;
  readonly solution: string;
  readonly quote: {
    readonly signature: string;
    readonly text: string;
  };
  readonly image: string;
};

/** Other Project */
export type OtherProject = {
  readonly name: string;
  readonly type: string;
  readonly githubUrl: string;
  readonly linkText?: string;
  readonly description: ReadonlyArray<string>;
  readonly image: string;
};
