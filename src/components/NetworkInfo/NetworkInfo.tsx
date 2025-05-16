import { useData } from '@/context';
import React from 'react';

export const NetworkInfo: React.FC = () => {
  const { metadata, token, isLoading, isError } = useData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="network-info p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">Info</h2>
      <div className="grid grid-cols-2 gap-2">
        {metadata && (
          <>
            <div>Network:</div>
            <div>{metadata.networkNode}</div>
            <div>Finalized Block:</div>
            <div>{metadata.finalized_blockNum}</div>
          </>
        )}
        {token && (
          <>
            <div>Token:</div>
            <div>{token.symbol}</div>
            <div>Decimal:</div>
            <div>{token.decimals}</div>
          </>
        )}
      </div>
    </div>
  );
};
