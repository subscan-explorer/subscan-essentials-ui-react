import axios from "axios";
import useSWR from "swr";
import { API_HOST } from "./const";

export interface APIWrapperProps<T> {
    code: number
    data: T
    generated_at: number
    message: string
}
export function unwrap<T>(apiData: APIWrapperProps<T> | undefined | null): T | null {
    if (!apiData || apiData.code !== 0) {
        return null
    }
    return apiData.data
}
const axiosInstance = axios.create({
    headers: {
        'Content-type': 'application/json',
    },
});

const postFetcher = ([url, data]: [string, any]) => {
    return axiosInstance.post(API_HOST + url, data).then((res) => res.data)
}

const runtimeFetcher = ([host, url, data]: [string, string, any]) => {
    return axiosInstance.post(host + url, data).then((res) => res.data)
}

// const postFetcher = ([url, data]: [string, any]) => {
//     return axiosInstance.post('/api/proxy', {
//         path: url,
//         data
//     }).then((res) => res.data);
// };

export type metadataType = {
    addressType: string;
    balanceAccuracy: string;
    count_extrinsic: string;
    count_signed_extrinsic: string;
    finalized_blockNum: string;
    networkNode: string;
    total_account: string;
    total_evm_account: string;
    total_evm_contract: string;
    total_transaction: string;
    total_transfer: string;
    enabledNewTransferableFormulas?: boolean
}

export const useMetadata = (data: {}) => {
    return useSWR<APIWrapperProps<metadataType>, Error>(['/api/scan/metadata', data], postFetcher);
};

export type tokenType = {
    token_id: string
    decimals: number
    symbol: string
}

export const useToken = (data: {}) => {
    return useSWR<APIWrapperProps<tokenType>, Error>(['/api/scan/token', data], postFetcher);
};

export type blockType = {
    block_num: number
    block_timestamp: number
    hash: string
    event_count: number
    extrinsics_count: number
    validator: string
    parent_hash: string
    state_root: string
    extrinsics_root: string
    spec_version: number
    finalized: boolean
}
type getBlockParams = {
    block_hash?: string
    block_num?: number
}
export async function getBlock(data: getBlockParams): Promise<APIWrapperProps<blockType>> {
    return postFetcher(['/api/scan/block', data]);
};

export const useBlock = (data: getBlockParams) => {
    return useSWR<APIWrapperProps<blockType>, Error>(['/api/scan/block', data], postFetcher);
};

export type getBlockListParams = {
    page?: number
    row?: number
}

export type blocksListType = {
    blocks: blockType[]
    count: number
}

export const useBlocks = (data: getBlockListParams) => {
    return useSWR<APIWrapperProps<blocksListType>, Error>(['/api/scan/blocks', data], postFetcher);
};


export type extrinsicType = {
    account_id: string
    block_num: number
    block_timestamp: number
    call_module: string
    call_module_function: string
    extrinsic_hash: string
    extrinsic_index: string
    fee: string
    finalized: boolean
    lifetime: {
        birth: number
        death: number
    } | null
    id: number
    nonce: number
    params: any[]
    signature: string
    success: boolean
}

type getExtrinsicParams = {
    hash?: string
    extrinsic_index?: string
}

export const useExtrinsic = (data: getExtrinsicParams) => {
    return useSWR<APIWrapperProps<extrinsicType>, Error>(['/api/scan/extrinsic', data], postFetcher);
};

export type extrinsicsListType = {
    extrinsics: extrinsicType[]
    count: number
}

export type getExtrinsicListParams = {
    page?: number
    row?: number
    block_num?: number
    address?: string
}

export const useExtrinsics = (host: string, data: getExtrinsicListParams) => {
    return useSWR<APIWrapperProps<extrinsicsListType>, Error>([host, '/api/scan/extrinsics', data], runtimeFetcher);
};

export type eventType = {
    block_num: number
    block_timestamp: number
    event_id: string
    event_idx: string
    event_index: string
    extrinsic_index: string
    id: number
    module_id: number
    params: any[]
    phase: number
}

type getEventParams = {
    event_index?: string
}

export const useEvent = (data: getEventParams) => {
    return useSWR<APIWrapperProps<eventType>, Error>(['/api/scan/event', data], postFetcher);
};

export type eventListType = {
    events: eventType[]
    count: number
}

export type getEventListParams = {
    page?: number
    row?: number
    block_num?: number
    extrinsic_index?: string
}

export const useEvents = (data: getEventListParams) => {
    return useSWR<APIWrapperProps<eventListType>, Error>(['/api/scan/events', data], postFetcher);
};

export type transferType = {
    amount: string
    blockNum: number
    block_timestamp: number
    extrinsic_index: string
    id: number
    receiver: string
    sender: string
    symbol: string
    token_id: string
}
export type transferListType = {
    list: transferType[]
    count: number
}

export type getTransferListParams = {
    page?: number
    row?: number
    block_num?: number
    address?: string
}

export const useTransfers = (data: getTransferListParams) => {
    return useSWR<APIWrapperProps<transferListType>, Error>(['/api/plugin/balance/transfer', data], postFetcher);
};

export type accountType = {
    address: string
    balance: string
    locked: string
    nonce: string
    reserved: string
}

type getAccountParams = {
    address: string
}

export const useAccount = (data: getAccountParams) => {
    return useSWR<APIWrapperProps<accountType>, Error>(['/api/plugin/balance/account', data], postFetcher);
};

export type accountListType = {
    list: accountType[]
    count: number
}

export type getAccountListParams = {
    page?: number
    row?: number
}

export const useAccounts = (data: getAccountListParams) => {
    return useSWR<APIWrapperProps<accountListType>, Error>(['/api/plugin/balance/accounts', data], postFetcher);
};

export type logType = {
    block_num: number
    data: string
    log_index: string
    log_type: string
}

export type logListType = logType[]

export type getLogListParams = {
    page?: number
    row?: number
    block_num?: number
}

export const useLogs = (data: getLogListParams) => {
    return useSWR<APIWrapperProps<logListType>, Error>(['/api/scan/logs', data], postFetcher);
};


//PVM
export type pvmBlockInfoType = {
    author: string;
    base_fee_per_gas: string;
    block_hash: string;
    block_num: number;
    block_size: string;
    difficulty: string;
    extra_data: string;
    gas_limit: string;
    gas_used: string;
    logs_bloom: string;
    miner: string;
    parent_hash: string;
    receipts_root: string;
    seal_fields: string;
    sha3_uncles: string;
    state_root: string;
    timestamp: number;
    total_difficulty: string;
    transaction_count: number;
    transactions_root: string;
    uncles: string;
}

type getPVMBlockParams = {
    hash?: string
    block_num?: number
}

export const usePVMBlock = (data: getPVMBlockParams) => {
    return useSWR<APIWrapperProps<pvmBlockInfoType>, Error>(['/api/plugin/evm/block', data], postFetcher);
};

export type getPVMBlockListParams = {
    page?: number
    row?: number
}

export type pvmBlockType = {
    block_num: number
    block_timestamp: number
    miner: string
    transactions: number
}

export type pvmBlocksListType = {
    list: pvmBlockType[]
    count: number
}

export const usePVMBlocks = (data: getPVMBlockListParams) => {
    return useSWR<APIWrapperProps<pvmBlocksListType>, Error>(['/api/plugin/evm/blocks', data], postFetcher);
};

export type pvmTxInfoType = {
    block_num: number;
    block_timestamp: number;
    contract: string;
    cumulative_gas_used: string;
    effective_gas_price: string;
    extrinsic_index: string;
    from_address: string;
    gas_limit: string;
    gas_price: string;
    gas_used: string;
    hash: string;
    input_data: string;
    max_fee_per_gas: string;
    max_priority_fee_per_gas: string;
    nonce: number;
    precompile: number;
    r: string;
    s: string;
    success: boolean;
    to_address: string;
    transaction_id: number;
    transaction_index: number;
    txn_type: number;
    v: number;
    value: string;
}

type getPVMTxParams = {
    hash: string
}

export const usePVMTx = (data: getPVMTxParams) => {
    return useSWR<APIWrapperProps<pvmTxInfoType>, Error>(['/api/plugin/evm/transaction', data], postFetcher);
};

export type getPVMTxListParams = {
    page?: number
    row?: number
    address?: string
    block_num?: number
}

export type pvmTxType = {
    block_num: number
    block_timestamp: number
    from_address: string
    hash: string
    to_address: string
    value: string
}

export type pvmTxListType = {
    list: pvmTxType[]
    count: number
}

export const usePVMTxs = (data: getPVMTxListParams) => {
    return useSWR<APIWrapperProps<pvmTxListType>, Error>(['/api/plugin/evm/transactions', data], postFetcher);
};

export type pvmAccountType = {
    evm_account: string
    balance: string
}

export type pvmAccountListType = {
    list: pvmAccountType[] | null
    count: number
}

export type getPVMAccountListParams = {
    page?: number
    row?: number
    address?: string
}

export const usePVMAccounts = (data: getPVMAccountListParams) => {
    return useSWR<APIWrapperProps<pvmAccountListType>, Error>(['/api/plugin/evm/accounts', data], postFetcher);
};

export type pvmTokenType = {
    base_token_uri: string
    category: string
    contract: string
    decimals: number
    holders: number
    name: string
    symbol: string
    totalSupply: number
    transfer_count: number
}
export type pvmTokenListType = {
    list: pvmTokenType[]
    count: number
}

export type getPVMTokenListParams = {
    page?: number
    row?: number
    contract?: string
    category?: string
}

export const usePVMTokens = (data: getPVMTokenListParams) => {
    return useSWR<APIWrapperProps<pvmTokenListType>, Error>(['/api/plugin/evm/tokens', data], postFetcher);
};

export type pvmTokenHolderType = {
    balance: string
    contract: string
    holder: string
}

export type pvmTokenHolderListType = {
    holders: pvmTokenHolderType[]
    count: number
}

export type getPVMTokenHolderListParams = {
    page?: number
    row?: number
    token_address?: string
}

export const usePVMTokenHolders = (data: getPVMTokenHolderListParams) => {
    return useSWR<APIWrapperProps<pvmTokenHolderListType>, Error>(['/api/plugin/evm/token/holder', data], postFetcher);
};

export type pvmTokenTransferType = {
    category: string
    contract: string
    create_at: number
    decimals: number
    from: string
    hash: string
    id: number
    name: string
    symbol: string
    to: string
    value: string
    
}

export type pvmTokenTransferListType = {
    transfers: pvmTokenTransferType[]
    count: number
}

export type getPVMTokenTransferListParams = {
    page?: number
    row?: number
    token_address?: string
    address?: string
    category?: string
}

export const usePVMTokenTransfers = (data: getPVMTokenTransferListParams) => {
    return useSWR<APIWrapperProps<pvmTokenTransferListType>, Error>(['/api/plugin/evm/token/transfer', data], postFetcher);
};

export type pvmAccountTokenType = {
    balance: number
    category: string
    contract: string
    decimals: number
    name: string
    symbol: string
    
}

export type pvmAccountTokenListType = pvmAccountTokenType[]

export type getPVMAccountTokenListParams = {
    page?: number
    row?: number
    category?: string
    address?: string
}

export const usePVMAccountTokens = (data: getPVMAccountTokenListParams) => {
    return useSWR<APIWrapperProps<pvmAccountTokenListType>, Error>(['/api/plugin/evm/account/tokens', data], postFetcher);
};

export type pvmContractType = {
    address: string
    contract_name: string
    transaction_count: number
    verify_status: string
}

export type pvmContractInfoType = {
    abi: any | null;
    address: string;
    block_num: number;
    CompileSettings: any | null;
    compiler_version: string;
    constructor_arguments: string;
    contract_name: string;
    creation_bytecode: string;
    creation_code: string;
    deploy_at: number;
    deploy_code_hash: string;
    deployer: string;
    eip_standard: string;
    event_identifiers: any | null;
    evm_version: string;
    external_libraries: any | null;
    extrinsic_index: string;
    method_identifiers: any | null;
    optimize: boolean;
    optimization_runs: number;
    precompile: number;
    proxy_implementation: string;
    source_code: string;
    transaction_count: number;
    tx_hash: string;
    verify_status: string;
    verify_time: number;
    verify_type: string;
}

export type pvmContractListType = {
    list: pvmContractType[]
    count: number
}

export type getPVMContractListParams = {
    page?: number
    row?: number
}

type getPVMContractParams = {
    address: string
}

export const usePVMContract = (data: getPVMContractParams) => {
    return useSWR<APIWrapperProps<pvmContractInfoType>, Error>(['/api/plugin/evm/contract', data], postFetcher);
};

export const usePVMContracts = (data: getPVMContractListParams) => {
    return useSWR<APIWrapperProps<pvmContractListType>, Error>(['/api/plugin/evm/contracts', data], postFetcher);
};

export type pvmSolcListType = string[]

export type getPVMSolcListParams = {
    releases?: boolean
}

export const usePVMSolcs = (data: getPVMSolcListParams) => {
    return useSWR<APIWrapperProps<pvmSolcListType>, Error>(['/api/plugin/evm/contract/solcs', data], postFetcher);
};

export type pvmResolcListType = string[]

export const usePVMResolcs = (data: {}) => {
    return useSWR<APIWrapperProps<pvmResolcListType>, Error>(['/api/plugin/evm/contract/resolcs', data], postFetcher);
};