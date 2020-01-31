export class Constants {
    public static FONT_LIBRARY: Font[] = [
        {   
            fontName: `Open Sans`,
            fontValue: `'Open Sans', sans-serif;`,
            fontSource:`https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap&subset=latin-ext,vietnamese`,
        },
        {   
            fontName: `Literata`,
            fontValue: `'Literata', serif;`,
            fontSource:`https://fonts.googleapis.com/css?family=Literata:400,500,600&display=swap&subset=latin-ext,vietnamese`,
        },
        {   
            fontName: `Niramit`,
            fontValue: `'Niramit', serif;`,
            fontSource:`https://fonts.googleapis.com/css?family=Niramit:400,600&display=swap&subset=vietnamese`,
        },
    ]
}

export interface Font{
    fontName: string;
    fontValue: string;
    fontSource: string;
}