export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Edual'
}

const passenger2: Passenger = {
    name: 'Melissa',
    children: ['Anos', 'Eros']
}

const returnChildrenNUmber = (passenger: Passenger): number =>{
    const howManyChildren = passenger.children?.length || 0;
    // const howManyChildren = passenger.children!.lenght;

    console.log(passenger.name, howManyChildren);
    return howManyChildren;
}

returnChildrenNUmber(passenger1);