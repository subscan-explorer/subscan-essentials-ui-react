import React from 'react';
import InfoCard from './InfoCard';
import TransactionList from './TransactionList';
import ExtrinsicList from './ExtrinsicList';

// 模拟数据
const mockSubstrateTransactions = [
  {
    id: '1',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
  {
    id: '2',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
  {
    id: '3',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
  {
    id: '4',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
  {
    id: '5',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
  {
    id: '6',
    extrinsicId: '123456-1',
    type: 'Balance(Transfer)',
    time: '5 mins ago',
  },
];

const mockPvmTransactions = [
  {
    id: '1',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
  {
    id: '2',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
  {
    id: '3',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
  {
    id: '4',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
  {
    id: '5',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
  {
    id: '6',
    hash: '0x123456...123456',
    fromAddress: '0x123456...123456',
    toAddress: '0x123456...123456',
    type: 'Transfer',
    time: '5 mins ago',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoCard 
              title="Substrate Block" 
              value="123,456"
              href="/block"
              bgColor="bg-pink-100"
            />
            <InfoCard 
              title="Extrinsic" 
              value="123,456"
              href="/extrinsic"
              bgColor="bg-pink-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <InfoCard 
              title="Account" 
              value="123,456"
              href="/account"
              bgColor="bg-pink-100"
            />
            <InfoCard 
              title="Transfer" 
              value="123,456"
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
              value="123,456"
              href="/pvm/block"
              bgColor="bg-blue-100"
            />
            <InfoCard 
              title="Transaction" 
              value="123,456"
              href="/pvm/tx"
              bgColor="bg-blue-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <InfoCard 
              title="PVM Account" 
              value="123,456"
              href="/pvm/account"
              bgColor="bg-blue-100"
            />
            <InfoCard 
              title="PVM Contract" 
              value="123,456"
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
