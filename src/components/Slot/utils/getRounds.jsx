const getRounds = ({options}) => {
    const min = options.minOptions;
    const max = options.maxOptions;
    const randomNUmber = Math.floor(Math.random() * (max - min + 1) + min);
    const siempreInpar = randomNUmber%2 ? randomNUmber : randomNUmber + 1 
    return siempreInpar
}

export default getRounds;
