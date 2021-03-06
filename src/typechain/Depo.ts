/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DepoInterface extends utils.Interface {
  contractName: "Depo";
  functions: {
    "captain(address)": FunctionFragment;
    "captains(address)": FunctionFragment;
    "demote(address)": FunctionFragment;
    "deposits(uint256)": FunctionFragment;
    "dfCore()": FunctionFragment;
    "masterAtArms(address)": FunctionFragment;
    "mastersAtArms(address)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "withdrawArtifact(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "captain", values: [string]): string;
  encodeFunctionData(functionFragment: "captains", values: [string]): string;
  encodeFunctionData(functionFragment: "demote", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deposits",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "dfCore", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "masterAtArms",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "mastersAtArms",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawArtifact",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "captain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "captains", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "demote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dfCore", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "masterAtArms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mastersAtArms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawArtifact",
    data: BytesLike
  ): Result;

  events: {
    "Demote(address,address)": EventFragment;
    "Deposit(address,uint256)": EventFragment;
    "Promote(address,address)": EventFragment;
    "Withdrawl(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Demote"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Promote"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawl"): EventFragment;
}

export type DemoteEvent = TypedEvent<
  [string, string],
  { demotor: string; demoted: string }
>;

export type DemoteEventFilter = TypedEventFilter<DemoteEvent>;

export type DepositEvent = TypedEvent<
  [string, BigNumber],
  { depositor: string; tokenId: BigNumber }
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export type PromoteEvent = TypedEvent<
  [string, string],
  { promotor: string; promoted: string }
>;

export type PromoteEventFilter = TypedEventFilter<PromoteEvent>;

export type WithdrawlEvent = TypedEvent<
  [string, BigNumber],
  { withdrawer: string; tokenId: BigNumber }
>;

export type WithdrawlEventFilter = TypedEventFilter<WithdrawlEvent>;

export interface Depo extends BaseContract {
  contractName: "Depo";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DepoInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    captain(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    captains(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    demote(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    dfCore(overrides?: CallOverrides): Promise<[string]>;

    masterAtArms(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mastersAtArms(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    onERC721Received(
      arg0: string,
      from: string,
      tokenId: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    withdrawArtifact(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  captain(
    pleb: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  captains(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  demote(
    pleb: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  dfCore(overrides?: CallOverrides): Promise<string>;

  masterAtArms(
    pleb: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mastersAtArms(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  onERC721Received(
    arg0: string,
    from: string,
    tokenId: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  withdrawArtifact(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    captain(pleb: string, overrides?: CallOverrides): Promise<void>;

    captains(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    demote(pleb: string, overrides?: CallOverrides): Promise<void>;

    deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    dfCore(overrides?: CallOverrides): Promise<string>;

    masterAtArms(pleb: string, overrides?: CallOverrides): Promise<void>;

    mastersAtArms(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    onERC721Received(
      arg0: string,
      from: string,
      tokenId: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    withdrawArtifact(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Demote(address,address)"(
      demotor?: string | null,
      demoted?: string | null
    ): DemoteEventFilter;
    Demote(demotor?: string | null, demoted?: string | null): DemoteEventFilter;

    "Deposit(address,uint256)"(
      depositor?: string | null,
      tokenId?: BigNumberish | null
    ): DepositEventFilter;
    Deposit(
      depositor?: string | null,
      tokenId?: BigNumberish | null
    ): DepositEventFilter;

    "Promote(address,address)"(
      promotor?: string | null,
      promoted?: string | null
    ): PromoteEventFilter;
    Promote(
      promotor?: string | null,
      promoted?: string | null
    ): PromoteEventFilter;

    "Withdrawl(address,uint256)"(
      withdrawer?: string | null,
      tokenId?: BigNumberish | null
    ): WithdrawlEventFilter;
    Withdrawl(
      withdrawer?: string | null,
      tokenId?: BigNumberish | null
    ): WithdrawlEventFilter;
  };

  estimateGas: {
    captain(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    captains(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    demote(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    dfCore(overrides?: CallOverrides): Promise<BigNumber>;

    masterAtArms(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mastersAtArms(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      from: string,
      tokenId: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawArtifact(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    captain(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    captains(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    demote(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    dfCore(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    masterAtArms(
      pleb: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mastersAtArms(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      from: string,
      tokenId: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawArtifact(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
