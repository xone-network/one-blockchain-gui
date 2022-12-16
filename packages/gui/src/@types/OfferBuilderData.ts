type OfferBuilderData = {
  offered: {
    xone: {
      amount: string;
    }[];
    tokens: {
      amount: string;
      assetId: string;
    }[];
    nfts: {
      nftId: string;
    }[];
    fee: {
      amount: string;
    }[];
  };
  requested: {
    xone: {
      amount: string;
    }[];
    tokens: {
      amount: string;
      assetId: string;
    }[];
    nfts: {
      nftId: string;
    }[];
    fee: {
      amount: string;
    }[];
  };
};

export default OfferBuilderData;
