import type { Attribute, Schema } from '@strapi/strapi';

export interface ArticleCauses extends Schema.Component {
  collectionName: 'components_article_causes';
  info: {
    description: 'Mulige \u00E5rsager til tilstanden';
    displayName: 'Causes';
  };
  attributes: {
    environmentalCauses: Attribute.RichText;
    lifestyleCauses: Attribute.RichText;
    otherFactors: Attribute.RichText;
  };
}

export interface ArticleLifestyleAdvice extends Schema.Component {
  collectionName: 'components_article_lifestyle_advice';
  info: {
    description: 'Konkrete livsstilsr\u00E5d';
    displayName: 'Lifestyle Advice';
  };
  attributes: {
    dietAdvice: Attribute.RichText;
    exerciseAdvice: Attribute.RichText;
    otherTips: Attribute.RichText;
    sleepAdvice: Attribute.RichText;
    stressReduction: Attribute.RichText;
  };
}

export interface ArticleNaturalApproaches extends Schema.Component {
  collectionName: 'components_article_natural_approaches';
  info: {
    description: 'Naturlige tilgange (urter, kosttilskud, f\u00F8devarer, metoder)';
    displayName: 'Natural Approaches';
  };
  attributes: {
    foods: Attribute.RichText;
    herbs: Attribute.RichText;
    importantNotes: Attribute.RichText;
    otherMethods: Attribute.RichText;
    supplements: Attribute.RichText;
  };
}

export interface ArticleShortExplanation extends Schema.Component {
  collectionName: 'components_article_short_explanations';
  info: {
    description: 'Kort forklaring af tilstanden';
    displayName: 'Short Explanation';
  };
  attributes: {
    acuteVsChronic: Attribute.RichText;
    prevalence: Attribute.Text;
    whatIsIt: Attribute.RichText;
  };
}

export interface ArticleWhenToSeeDoctor extends Schema.Component {
  collectionName: 'components_article_when_to_see_doctor';
  info: {
    description: 'Hvorn\u00E5r man b\u00F8r kontakte l\u00E6ge';
    displayName: 'When To See Doctor';
  };
  attributes: {
    disclaimer: Attribute.RichText;
    regularCheckup: Attribute.RichText;
    urgentCare: Attribute.RichText;
    warningSignals: Attribute.RichText;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'article.causes': ArticleCauses;
      'article.lifestyle-advice': ArticleLifestyleAdvice;
      'article.natural-approaches': ArticleNaturalApproaches;
      'article.short-explanation': ArticleShortExplanation;
      'article.when-to-see-doctor': ArticleWhenToSeeDoctor;
    }
  }
}
