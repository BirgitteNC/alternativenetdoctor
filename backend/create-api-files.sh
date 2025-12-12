#!/bin/bash

# Array of API names
apis=("article" "symptom-condition" "supplement-herb" "product" "partner")

for api in "${apis[@]}"; do
  # Controller
  cat > "/home/claude/alternativenetdoctor/backend/src/api/$api/controllers/${api}.js" << CONTROLLER
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${api}.${api}', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
CONTROLLER

  # Routes
  cat > "/home/claude/alternativenetdoctor/backend/src/api/$api/routes/${api}.js" << ROUTES
const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${api}.${api}');
ROUTES

  # Services
  cat > "/home/claude/alternativenetdoctor/backend/src/api/$api/services/${api}.js" << SERVICES
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${api}.${api}');
SERVICES

done

echo "All API files created successfully!"
