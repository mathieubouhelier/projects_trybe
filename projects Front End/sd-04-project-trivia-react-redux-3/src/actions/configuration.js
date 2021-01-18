export const STORE_CONFIGURATION = 'STORE_CONFIGURATION';

const storeConfiguration = (apiFilters) => ({
  type: STORE_CONFIGURATION,
  apiFilters,
});

export default storeConfiguration;
