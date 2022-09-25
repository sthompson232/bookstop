export interface ReCaptchaInstance {
  ready: (cb: () => any) => any
  execute: (site_key: string, options: ReCaptchaExecuteOptions) => Promise<string>
  render: (id: string, options: ReCaptchaRenderOptions) => any
}

interface ReCaptchaExecuteOptions {
  action: string
}

interface ReCaptchaRenderOptions {
  sitekey: string
  size: 'invisible'
}
