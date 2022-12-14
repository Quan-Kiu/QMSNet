import { Button, Col, Collapse, DatePicker, Form, Input, Row, Select, Switch } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '../../../../components/icons'
import { updateProfile } from '../../../../redux/auth/action'
import { authSelector } from '../../../../redux/auth/reducer'

const InfomationForm = styled(Form)`

.ant-input.ant-input-lg{
}
.ant-form-item-required::before{
  display: none !important;
}
.ant-collapse-content{
  background: white;
  .ant-collapse-content-box{
    background: white;
  }
}
label{
  font-size: 1.6rem;
  font-weight: 500;
}
  .title{
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .ant-row.ant-form-item{
    margin-bottom: 10px;
  }
  .ant-collapse-content > .ant-collapse-content-box{
    padding: 10px;
  }
  .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header{
    font-size: 1.8rem;
    font-weight: 600;
    padding: 10px 0;
    padding-left: 10px;
   
  }
  .ant-form-item-control-input-content{
    button:not([type="submit"]){
      font-size: 1.6rem;
      display: inline-block;
      width: max-content;
      font-weight: 600;
      color: ${props => props.theme['fds_blue60']};
      border: unset;
    }   
  }
`;
const Information = props => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(authSelector);
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('https://provinces.open-api.vn/api/?depth=2');
      if (res?.data?.length > 0) {
        setProvince(res.data);
      }
    }
    fetchApi();
  }, [])

  const handleOnUpdate = (values) => {
    dispatch(updateProfile({ ...values, dob: values?.dob }))
  }
  const [form] = Form.useForm();
  return (
    <InfomationForm layout="vertical" form={form} onFinish={handleOnUpdate}>

      <Collapse bordered={false} accordion defaultActiveKey={'general'} expandIconPosition={"right"}  >
        <Collapse.Panel header="Th??ng tin chung" key="general">
          <Form.Item initialValue={user?.fullname} label="H??? v?? t??n" name="fullname">
            <Input size="large"></Input>
          </Form.Item>
          <Form.Item label="Ng??y sinh" name="dob">
            <DatePicker placeholder="Sinh nh???t" size="large" defaultValue={user?.dob ? moment(user?.dob) : null} style={{
              width: '100%'
            }} dropdownClassName="q-date-picker" format={'DD/MM/YYYY'} />
          </Form.Item>
          <Form.Item initialValue={user?.mobile} label="S??? ??i???n tho???i" name="mobile">
            <Input size="large" />
          </Form.Item>
          <Form.Item initialValue={user?.gender} label="Gi???i t??nh" name="gender">
            <Select size="large">
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={2}>N???</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item initialValue={user?.maritalStatus} label="M???i quan h???" name="maritalStatus">
            <Select size="large">
              <Select.Option value={1}>?????c th??n</Select.Option>
              <Select.Option value={2}>??ang h???n h??</Select.Option>
              <Select.Option value={3}>???? k???t h??n</Select.Option>
            </Select>
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header="C??ng vi???c" key="works">
          <Row>
            <Col span={24}>
              <Form.List initialValue={user?.works || []} name="works">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={[10, 10]} align="top">
                        <Col flex={1}>
                          <Form.Item
                            label="T??n c??ng ty"
                            style={{
                              flex: '1'
                            }}
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n c??ng ty!' }]}
                          >
                            <Input size="large" placeholder="C??ng ty" />
                          </Form.Item>

                          <Form.Item
                            label="Ch???c v???"
                            {...restField}
                            name={[name, 'position']}
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n ch???c v???!' }]}
                          >
                            <Input size="large" placeholder="Ch???c v???" />
                          </Form.Item>

                          <Form.Item
                            label="T??i ??ang l??m vi???c ??? ????y"
                            {...restField}
                            name={[name, 'working']}
                          >
                            <Switch size="large" defaultChecked={user?.works[key]?.working} valuePropName="checked"></Switch>
                          </Form.Item>

                        </Col>
                        <Col style={{
                          paddingRight: '10px'
                        }}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    {(user?.works?.length + fields.length) < 3 && <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Th??m c??ng vi???c
                      </Button>
                    </Form.Item>}

                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Collapse.Panel>
        <Collapse.Panel header="Tr?????ng H???c" key="schools">
          <Row>
            <Col span={24}>
              <Form.List initialValue={user?.schools} name="schools">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={[10, 10]} align="top">
                        <Col flex={1}>
                          <Form.Item
                            label="T??n tr?????ng"
                            style={{
                              flex: '1'
                            }}
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n tr?????ng!' }]}
                          >
                            <Input size="large" placeholder="T??n Tr?????ng" />
                          </Form.Item>

                          <Form.Item
                            label="T??i ??ang h???c ??? ????y"
                            {...restField}
                            name={[name, 'learning']}
                          >
                            <Switch defaultChecked={user?.schools[key]?.learning}></Switch>
                          </Form.Item>

                        </Col>
                        <Col>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    {(user?.schools?.length + fields?.length < 3) && <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Th??m tr?????ng h???c
                      </Button>
                    </Form.Item>}
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Collapse.Panel>
        <Collapse.Panel header="N??i ???/Qu?? Qu??n" key="address">
          <Form.Item initialValue={user?.address} name="address" label="N??i ??? hi???n nay">
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name={['address', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'T???nh/Th??nh kh??ng ???????c ????? tr???ng' }]}
                >
                  <Select size="large" onChange={async (value, options) => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${options.code}?depth=2`);
                    if (res.data) {
                      setDistricts(res.data);
                    }
                  }} showSearch optionFilterProp='name' options={province} fieldNames={{
                    label: 'name',
                    value: 'name'

                  }} placeholder="Ch???n tinh th??nh">
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>

                <Form.Item
                  name={['address', 'district']}
                  noStyle

                  rules={[{ required: true, message: 'Th??? x??/Huy???n kh??ng ???????c ????? tr???ng' }]}
                >
                  <Select size="large" showSearch optionFilterProp='name' options={districts?.districts} fieldNames={{
                    label: 'name',
                    value: 'name'

                  }} placeholder="Ch???n Th??? x??/Huy???n">
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item initialValue={user?.countryside} name="countryside" label="Qu?? qu??n">
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name={['countryside', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'T???nh/Th??nh kh??ng ???????c ????? tr???ng' }]}
                >
                  <Select size="large" onChange={async (value, options) => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${options.code}?depth=2`);
                    if (res.data) {
                      setDistricts(res.data);
                    }
                  }} showSearch optionFilterProp='name' options={province} fieldNames={{
                    label: 'name',
                    value: 'name'

                  }} placeholder="Ch???n tinh th??nh">
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>

                <Form.Item
                  name={['countryside', 'district']}
                  noStyle

                  rules={[{ required: true, message: 'Th??? x??/Huy???n kh??ng ???????c ????? tr???ng' }]}
                >
                  <Select size="large" showSearch optionFilterProp='name' options={districts?.districts} fieldNames={{
                    label: 'name',
                    value: 'name'

                  }} placeholder="Ch???n Th??? x??/Huy???n">
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

        </Collapse.Panel>

      </Collapse>
      <Form.Item>
        <Button loading={loading} className="q-button" type="primary" icon={<SaveOutlined />} size="large" style={{
          marginTop: '10px',
          width: '100%',
        }} htmlType="submit">
          L??u
        </Button>
      </Form.Item>
    </InfomationForm>
  )
}

Information.propTypes = {}

export default Information