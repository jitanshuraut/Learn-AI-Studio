export interface CourseStatus {
    message: string;
    name: string;
    numberofdays: number;
    safe: boolean;
    Introduction: any
}

export interface ModuleData {
    dayNumber: number;
    moduleNumber: number;
    title: string;
}

export interface RootLayoutProps {
    children: React.ReactNode;
}

export interface LinkEmailProps {
    token?: string;
}

export interface ResetPasswordProps {
    token?: string;
}

export interface SectionProps {
    children?: any;
}

export interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: any;
}

export interface CourseCardProps {
    day: string;
    modules: string[];
}

export interface CreditContextProps {
    Credit: number;
    setCredit: React.Dispatch<React.SetStateAction<number>>;
}

export interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export interface BackButtonProps {
    label: string
    href: string
}

export interface HeaderProps {
    title: string
}

export type CourseData = {
    name: string;
    numberofdays: number;
    Introduction: string[];
    Assessment: string[];
    Conclusion: string[];
    ReferenceBooks: {
        title: string;
        version: string;
        author: string;
        source: string;
    }[];
    CourseStructureInfluence: string;
    [key: string]:
    | string
    | number
    | string[]
    | { title: string; version: string; author: string; source: string }[]
    | undefined;
};

export interface ModuleData {
    day: number;
    module: number;
    content: {
      data: string;
    };
  }