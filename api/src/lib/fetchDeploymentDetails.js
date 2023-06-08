const fetchDeployment = require('./fetchDeployment');
const { EC_TAG_NAME } = require('../config');
const { EC_TAG_NAME_1 } = require('../config');

//
// fetchDeploymentDetails(id) - returns a promose for a deployments important meta-data
//
const fetchDeploymentDetails = deploymentID =>
  fetchDeployment(deploymentID).then(json => {
    const matchingTag = (json.metadata.tags || []).find(
      tag => tag.key === EC_TAG_NAME
    );
    const matchingTag_1 = (json.metadata.tags || []).find(
      tag => tag.key === EC_TAG_NAME_1
    );
    return {
      id: json.id,
      name: json.name,
      tag: matchingTag?.value || 'untagged',
      tag1: matchingTag_1?.value || 'untagged',
      state: json.metadata.hidden
        ? 'hidden'
        : json.healthy
        ? 'healthy'
        : 'unhealthy',
    };
  });

module.exports = fetchDeploymentDetails;
