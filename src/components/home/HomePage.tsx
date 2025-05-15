import React from 'react';
import InfoCard from './InfoCard';
import TransactionList from './TransactionList';
import ExtrinsicList from './ExtrinsicList';
import { useData } from '@/context';
import { formatNumber } from '@/utils/text';

const HomePage: React.FC = () => {
    const { metadata, token } = useData();
    if (!metadata)  {
        return null
    }
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoCard 
              title="Substrate Block" 
              value={formatNumber(metadata.finalized_blockNum)}
              href="/block"
              bgColor="bg-pink-100"
            />
            <InfoCard 
              title="Extrinsic" 
              value={formatNumber(metadata.count_extrinsic)}
              href="/extrinsic"
              bgColor="bg-pink-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <InfoCard 
              title="Account" 
              value={formatNumber(metadata.count_account)}
              href="/account"
              bgColor="bg-pink-100"
            />
            <InfoCard 
              title="Transfer" 
              value={formatNumber(metadata.count_transfer)}
              href="/transfer"
              bgColor="bg-pink-100"
            />
          </div>
          
          <ExtrinsicList/>
        </div>
        
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoCard 
              title="PVM Block" 
              value={metadata.finalized_blockNum}
              href="/pvm/block"
              bgColor="bg-blue-100"
            />
            <InfoCard 
              title="Transaction" 
              value={metadata.total_transaction}
              href="/pvm/tx"
              bgColor="bg-blue-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <InfoCard 
              title="PVM Account" 
              value={metadata.total_evm_account}
              href="/pvm/account"
              bgColor="bg-blue-100"
            />
            <InfoCard 
              title="PVM Contract" 
              value={metadata.total_evm_contract}
              href="/pvm/contract"
              bgColor="bg-blue-100"
            />
          </div>
          
          <TransactionList/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
