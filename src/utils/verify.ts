export const verifyUpcase = (str: string) => {
  const re = /[A-Z]/g;
  const found = str.match(re);

  return !!found;
};

export const verifyLowcase = (str: string) => {
  const re = /[a-z]/g;
  const found = str.match(re);

  return !!found;
};

export const verifyNumber = (str: string) => {
  const re = /[0-9]/g;
  const found = str.match(re);

  return !!found;
};

export const verifyCharacter = (str: string) => {
  const re = /[^a-zA-Z0-9]/g;
  const found = str.match(re);

  return !!found;
};
