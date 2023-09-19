import { ChangeEvent, forwardRef, KeyboardEventHandler } from 'react'
import styled from 'styled-components'

type LoginInputProps = {
  title: string
  value: string
  placeholder: string
  type: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ title, value, type, placeholder, onChange, onKeyPress }, ref) => {
    return (
      <Layout>
        <Label>{title}</Label>
        <Input
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          onKeyPress={onKeyPress}
        />
      </Layout>
    )
  },
)

LoginInput.displayName = 'LoginInput'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem;
`

const Label = styled.label`
  color: #000;
  font-family: Noto Sans;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 1rem;
`

const Input = styled.input`
  width: 26rem;
  height: 3.2rem;
  flex-shrink: 0;
  fill: rgba(255, 255, 255, 0.8);
  border: 1px solid #cac9c9;
  border-radius: 3rem;
  color: black;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  padding-left: 1.3rem;
  &::placeholder {
    color: silver;
  }
  &:focus::placeholder {
    color: transparent;
  }
`

export default LoginInput
