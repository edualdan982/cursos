const skills: string[] = [ 'bash', 'Counter', 'Healing'];
console.log('skills', skills);

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Java', 'Typescript', 'CSS']
}

strider.hometown = 'La Paz';

console.log('strider', strider);
strider.skills = [...strider.skills, 'Angular'];

export {};