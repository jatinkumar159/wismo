import platform from 'platform';

export function getPlatformData(): string | undefined {
    return platform.description;
}