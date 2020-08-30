import { useEffect, useState } from 'react';
import { Service } from './types';
import { PublicFeedResponse } from '../types';

const usePublicFeedService = (instagramPageUrl: string) => {
  const [result, setResult] = useState<Service<PublicFeedResponse>>({
    status: 'loading'
  });

  useEffect(() => {
    let mounted = true;
    // '?__a=1' for JSON * (this is probably going to be broken in the future)
    fetch(`${instagramPageUrl}?__a=1`)
      .then(response => response.json())
      .then(response => {
        if (mounted) { 
          setResult({ status: 'loaded', payload: response })
        }
      })
      .catch(error => {
        if (mounted) {
          setResult({ status: 'error', error })
        }
      });

    return () => { mounted = false };
  }, [instagramPageUrl]);

  return result;
};

export default usePublicFeedService;