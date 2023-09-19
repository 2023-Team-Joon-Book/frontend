import styled from 'styled-components'

type LoginInputProps = {
  title: string
  value: string
  placeholder: string
  type: string
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function LoginInput({ title, value, type, placeholder }: LoginInputProps) {
  return (
    <Layout>
      <Label>{title}</Label>
      <Input
        value={value}
        type={type}
        // onChange={onChange}
        placeholder={placeholder}></Input>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem; // 줄임
`

const Label = styled.label`
  color: #000;
  font-family: Noto Sans;
  font-size: 1.2rem; // 줄임
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 1rem; // 줄임
`

const Input = styled.input`
  width: 26rem; // 줄임
  height: 3.2rem; // 줄임
  flex-shrink: 0;
  fill: rgba(255, 255, 255, 0.8);
  border: 1px solid #000;
  border-radius: 3rem; // 줄임
  color: black;
  font-size: 1.2rem; // 줄임
  font-style: normal;
  font-weight: 400;
  padding-left: 1.3rem; // 줄임
`
